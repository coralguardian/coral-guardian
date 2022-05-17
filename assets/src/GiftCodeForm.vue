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
  name: "gift-code-form",
  mixins: [paymentMixin],
  components: {
    BaseForm
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
    this.hasPayment()
  }
}
</script>

<style lang="scss" scoped>
.v-application {
  background: transparent !important;
}
</style>