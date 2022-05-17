<template>
  <v-app>
    <base-form v-bind="form"/>
  </v-app>
</template>

<script>
import BaseForm from "@/components/forms/BaseForm";
import paymentMixin from "./mixins/paymentMixin";
import {mapGetters} from "vuex";

export default {
  name: "app",
  mixins: [paymentMixin],
  components: {
    BaseForm
  },
  props: {
    donatorNature: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      form: 'getForm'
    })
  },
  methods: {
    hasPayment() {
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
  },
  mounted() {
    if (this.donatorNature.length) {
      this.$store.commit("updateForm", {adopter: {type: this.donatorNature}})
    }
    this.hasPayment()
  }
}
</script>

<style lang="scss" scoped>
.v-application {
  background: transparent !important;
}
</style>