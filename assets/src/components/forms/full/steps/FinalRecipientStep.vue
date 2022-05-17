<template>
  <div>
    <p v-html="$t('default.stepper.finalRecipient.description', this.translation.count = this.count)"/>
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
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import SocialShareBlock from "../../blocks/SocialShareBlock";
import validationMixin from "../../../../mixins/validationMixin";
import itemTranslationMixin from "../../../../mixins/itemTranslationMixin";

export default {
  name: "final-adoption-step",
  components: {
    DonationBlock,
    SocialShareBlock
  },
  mixins: [apiMixin, finalStepMixin, validationMixin, itemTranslationMixin],
  mounted() {
    this.$root.$on(this.apiEventName, () => this.$root.$emit('ApiValid'))
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style scoped>

</style>