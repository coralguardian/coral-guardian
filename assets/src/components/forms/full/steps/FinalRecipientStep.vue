<template>
  <div>
    <p v-html="description"/>
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
import {mapGetters} from "vuex";
import paymentMixin from "@/mixins/paymentMixin";

export default {
  name: "final-adoption-step",
  components: {
    DonationBlock,
    SocialShareBlock
  },
  mixins: [apiMixin, finalStepMixin, validationMixin, itemTranslationMixin, paymentMixin],
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      gift: "getGift"
    }),
    description() {
      let base = 'default.stepper.finalRecipient.description.';
      if (!this.adopter.send_to_friend) {
        base += "sendToMe"
      } else {
        base += this.gift.toSendOn === null ? "base" : "scheduled"
      }
      return this.$t(base)
    }
  },
  mounted() {
    this.$root.$on(this.apiEventName, () => this.$root.$emit('ApiValid'))
    this.cleanLocalStorage()
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style scoped>

</style>