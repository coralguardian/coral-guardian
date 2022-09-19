<template>
  <div>
    <p v-if="adoption.type === 'file'"
       v-html="$tc('default.stepper.finalAdoption.description_file', order.quantity, translation)"/>
    <p v-else-if="hasDownloaded" v-html="$tc('default.stepper.finalAdoption.description_no_certif', order.quantity)"/>
    <div v-else>
      <p>{{ $tc('default.stepper.certificate.adoption.email', order.quantity) }}</p>
      <p v-if="order.quantity <= 3"
         v-html="$tc('default.stepper.finalAdoption.description', order.quantity, {link: this.getGetUrl({order_uuid: order.uuid})})"/>
    </div>

    <social-share-block/>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import SocialShareBlock from "../blocks/SocialShareBlock";
import {mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import paymentMixin from "../../../mixins/paymentMixin";

export default {
  name: "final-adoption-step",
  components: {
    SocialShareBlock
  },
  mixins: [apiMixin, finalStepMixin, validationMixin, itemTranslationMixin, paymentMixin],
  computed: {
    ...mapGetters({
      hasDownloaded: "hasDownloaded",
      adoption: "getAdoption"
    })
  },
  mounted() {
    this.cleanLocalStorage()
    this.$root.$on(this.apiEventName, () => this.$root.$emit('ApiValid'))
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style scoped>

</style>