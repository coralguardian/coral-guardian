<template>
  <v-app>
    <base-form v-bind="form"/>
  </v-app>
</template>

<script>
import BaseForm from "@/components/forms/BaseForm";
import {mapGetters} from "vuex";

export default {
  name: "gift-code-form",
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
