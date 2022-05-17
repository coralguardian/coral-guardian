<template>
  <div>
    <p v-if="adoption.type === 'file'" v-html="$tc('default.stepper.finalAdoption.description_file', order.quantity, translation)"/>
    <p v-else-if="hasDownloaded" v-html="$tc('default.stepper.finalAdoption.description_no_certif', order.quantity)"/>
    <p v-else v-html="$tc('default.stepper.finalAdoption.description', order.quantity, {link: this.getGetUrl({order_id: order.id})})"/>
    <social-share-block/>
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <donation-block final/>
    </v-form>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import DonationBlock from "../../../components/forms/blocks/DonationBlock";
import SocialShareBlock from "../blocks/SocialShareBlock";
import {mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import paymentMixin from "../../../mixins/paymentMixin";

export default {
  name: "final-adoption-step",
  components: {
    DonationBlock,
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