import PaymentStatusEnum from "@/enums/paymentStatusEnum";
import queryParamsMixin from "@/mixins/queryParamsMixin";
import stripeMixin from "@/mixins/stripeMixin";
import {mapActions} from "vuex";

export default {
  mixins: [queryParamsMixin, stripeMixin],
  data() {
    return {
      checkingForPayment: false
    }
  },
  methods: {
    ...mapActions({
      forceUpdate: 'forceUpdate'
    }),
    checkForPaymentIntent() {
      this.checkingForPayment = true
      this.fillParams()
      return new Promise((resolve, reject) => {
        if (this.params.setup_intent_client_secret) {
          let data = localStorage.getItem(this.params.setup_intent_client_secret);
          if (data) {
            data = JSON.parse(data)
            this.forceUpdate(data).then(() => {
              this.checkPaymentStatus().then((status) => resolve(status))
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
