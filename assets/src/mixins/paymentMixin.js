import {mapGetters} from "vuex";

export default {
  data() {
    return {
      spk: process.env.VUE_APP_STRIPE_API_KEY,
      stripe: null
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder"
    })
  },
  methods: {
    createStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.spk);
    },
    cleanLocalStorage() {
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("payment_intent")
      urlParams.delete("redirect_status")
      urlParams.delete("payment_intent_client_secret")
      window.history.replaceState({}, document.title, window.location.pathname + urlParams.toString())
      if (this.order.clientSecret) {
        localStorage.removeItem(this.order.clientSecret)
      }
    },
    checkPaymentStepForBasicForms() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      if (!clientSecret) {
        return;
      }
      let data = localStorage.getItem(clientSecret);
      if (data) {
        this.$store.dispatch("redirectToPaymentStep", data)
      } else {
        this.cleanLocalStorage()
      }
    }
  }
}