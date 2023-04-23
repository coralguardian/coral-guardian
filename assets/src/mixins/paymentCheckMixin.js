import PaymentStatusEnum from "@/enums/paymentStatusEnum";
import queryParamsMixin from "@/mixins/queryParamsMixin";
import stripeMixin from "@/mixins/stripeMixin";
import {mapActions} from "vuex";
import apiMixin from "@/mixins/apiMixin";

export default {
  mixins: [queryParamsMixin, stripeMixin, apiMixin],
  data() {
    return {
      checkingForPayment: false,
      adoptionCheckingInterval: null,
      adoptionCheckingTimeout: null,
      mode: 'adoption'
    }
  },
  methods: {
    ...mapActions({
      forceUpdate: 'forceUpdate',
      updateForm: 'updateForm'
    }),
    checkForPaymentIntent() {
      this.fillParams()
      return new Promise((resolve, reject) => {
        if (this.params.setup_intent_client_secret) {
          this.checkingForPayment = true
          let data = localStorage.getItem(this.params.setup_intent_client_secret);
          if (data) {
            data = JSON.parse(data)
            this.forceUpdate(data).then(() => {
              this.checkPaymentStatus().then((status) => {
                if (this.mode === "adoption" && data.order.type === 'regular') {
                  this.checkForAdoptionTimeout()
                    .then(() => resolve(status))
                    .catch(() => resolve('error'))
                } else {
                  resolve(status)
                }
              })
            })
          } else {
            reject()
          }
        } else {
          resolve()
        }
      })
    },
    async checkPaymentStatus() {
      this.createStripe()
      const {setupIntent} = await this.stripe.retrieveSetupIntent(this.params.setup_intent_client_secret);
      switch (setupIntent.status) {
        case "succeeded":
          return PaymentStatusEnum.succeeded
        case "processing":
        case "requires_payment_method":
        default:
          return PaymentStatusEnum.error
      }
    },
    checkForAdoptionTimeout() {
      return new Promise((resolve, reject) => {
        this.adoptionCheckingInterval = setInterval(() => {
          this.checkForAdoptionUuid().then(() => resolve())
        }, 1000)
        this.adoptionCheckingTimeout = setTimeout(() => {
          clearInterval(this.adoptionCheckingInterval)
          this.$root.$emit("displayError", 'adoption_not_found')
          reject()
        }, 10000)
      })
    },
    checkForAdoptionUuid() {
      return new Promise((resolve) => {
        this.getByUrl(this.getGetUrlNoApiData({stripePaymentIntentId: this.params.setup_intent}, "adoption/uuid"))
          .then((resp) => {
            clearInterval(this.adoptionCheckingInterval)
            clearTimeout(this.adoptionCheckingTimeout)
            this.updateForm({order: {uuid: resp.data.uuid}}).then(() => {
              resolve()
            })
          })
      })
    },
    cleanLocalStorage() {
      const urlParams = new URLSearchParams(window.location.search)

      if (urlParams.has("setup_intent_client_secret")) {
        localStorage.removeItem(urlParams.get("setup_intent_client_secret"))
      }

      urlParams.delete("setup_intent")
      urlParams.delete("redirect_status")
      urlParams.delete("setup_intent_client_secret")

      const urlParamsString = urlParams.toString()

      let fullUrl = window.location.pathname + (urlParamsString.length > 0 ? "?" + urlParamsString : "")

      window.history.replaceState({}, document.title, fullUrl)
    }
  }
}
