<template>
  <div class="d-flex flex-column mt-5">
    <v-skeleton-loader
        v-show="!isFormLoaded"
        type="article"
    />
    <form v-show="isFormLoaded" id="payment-form" class="d-flex flex-column">
      <div ref="paymentElement" class="m-2">
        <!-- A Stripe Element will be inserted here. -->
      </div>
      <div id="payment-message" class="hidden"></div>
      <span class="error-message red--text mt-3">{{ errorMessage }}</span>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import apiMixin from "@/mixins/apiMixin";
import paymentMixin from "../../mixins/paymentMixin";

export default {
  name: "stripe-card-data",
  mixins: [apiMixin, paymentMixin],
  props: {
    mode: {
      type: String,
      default: 'adoption'
    }
  },
  data() {
    return {
      paymentElement: undefined,
      elements: null,
      isFormLoaded: false,
      isCompleted: false,
      errorMessage: ""
    }
  },
  computed: {
    ...mapGetters({
      postPaymentData: "getPostPaymentDataAdoption",
      donation: "getDonation",
      order: "getOrder"
    }),
    element() {
      return this.mode === "adoption" ? this.order : this.donation
    },
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    createPaymentIntent() {
      return new Promise((resolve, reject) => {
        let data;
        if (this.mode === 'adoption') {
          data = this.postPaymentData
        } else {
          data = this.$store.getters.getPostPaymentDataDonation
        }
        this[this.apiData.method](data, this.apiData.endpoint)
            .then((resp) => {
              const data = this.mode === "adoption" ? {order: resp.data} : {donation: resp.data}
              this.updateForm(data).then(() => {
                resolve()
              })
            })
            .catch(() => {
              this.errorMessage = this.$t("default.stripe.payment.error")
              reject()
        })
      })
    },
    async purchase() {
      this.storePaymentData()
      const elements = this.elements
      const { error } = await this.stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
      });

      this.cleanLocalStorage()
      this.errorMessage = error.message
      this.$root.$emit('IsLoaded')
    },
    storePaymentData() {
      localStorage.setItem(this.element.clientSecret, JSON.stringify(this.$store.state.data))
    },
    checkCompletion(event) {
      this.errorMessage = ""
      if (event.complete) {
        this.isCompleted = true
      } else if (event.error) {
        this.errorMessage = event.error.message
      }
    },
    handleStripe() {
      this.createStripe()
      const clientSecret = this.element.clientSecret
      this.elements = this.stripe.elements({clientSecret})
      this.paymentElement = this.elements.create('payment');
      this.paymentElement.mount(this.$refs.paymentElement);
      this.paymentElement.on('change', (event) => this.checkCompletion(event))
      this.isFormLoaded = true
    },
    validateCard() {
      if (this.isCompleted) {
        this.$root.$emit('StepValid')
      } else {
        this.$root.$emit('IsLoaded')
        this.errorMessage = this.$t('default.stepper.payment.errors.card')
      }
    }
  },
  mounted() {
    this.createPaymentIntent().then(() => this.handleStripe())
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  min-height: 24px;
  font-size: 16px;
}
</style>