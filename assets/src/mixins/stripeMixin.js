export default {
  data() {
    return {
      spk: process.env.VUE_APP_STRIPE_API_KEY,
      stripe: null
    }
  },
  methods: {
    createStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.spk);
    }
  }
}
