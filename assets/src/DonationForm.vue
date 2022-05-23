<template>
  <v-app>
    <base-form v-bind="form"/>
  </v-app>
</template>

<script>
import BaseForm from "@/components/forms/BaseForm";
import PaymentMixin from "./mixins/paymentMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "app",
  mixins: [PaymentMixin],
  components: {
    BaseForm
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    donatorNature: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      form: 'getForm',
    })
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  },
  mounted() {
    if (this.type.length) {
      this.updateForm({donationType: this.type, isDonationTypeSetByShortcode: true})
    }
    if (this.donatorNature.length) {
      this.updateForm({donatorNature: this.donatorNature, isDonatorNatureSetByShortcode: true})
    }
    this.checkPaymentStepForBasicForms()
  }
}
</script>

<style lang="scss" scoped>
.v-application {
  background: transparent !important;
}
</style>