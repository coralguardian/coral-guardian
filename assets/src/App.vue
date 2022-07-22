<template>
  <v-app>
    <base-form v-bind="form"/>
  </v-app>
</template>

<script>
import BaseForm from "@/components/forms/BaseForm";
import paymentMixin from "./mixins/paymentMixin";
import {mapGetters} from "vuex";
import missingTranslationsMixin from "@/mixins/missingTranslationsMixin";

export default {
  name: "app",
  mixins: [paymentMixin, missingTranslationsMixin],
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

  },
  mounted() {
    if (this.donatorNature.length) {
      this.$store.commit("updateForm", {adopter: {type: this.donatorNature}})
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