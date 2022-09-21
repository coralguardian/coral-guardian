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
  computed: {
    ...mapGetters({
      form: 'getForm'
    })
  },
}
</script>

<style lang="scss" scoped>
.v-application {
  background: transparent !important;
}
</style>