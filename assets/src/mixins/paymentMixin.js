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

      let fullUrl = window.location.pathname + urlParams.length > 0 ? "?" + urlParams.toString() : ""
      window.history.replaceState({}, document.title, fullUrl)

      if (this.order.clientSecret) {
        localStorage.removeItem(this.order.clientSecret)
      }
    }
  }
}
