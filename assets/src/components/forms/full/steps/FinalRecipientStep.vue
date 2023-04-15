<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.finalRecipient.hint", {count: order.quantity, item: translation.item}) }}
    </template>

    <p class="cg-base-text light" v-html="description"/>

  </final-step>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import validationMixin from "../../../../mixins/validationMixin";
import itemTranslationMixin from "../../../../mixins/itemTranslationMixin";
import {mapGetters} from "vuex";
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "final-adoption-step",
  components: {
    FinalStep
  },
  mixins: [apiMixin, finalStepMixin, validationMixin, itemTranslationMixin],
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
  }
}
</script>

<style scoped lang="scss">
.cg-base-text.light {
  line-height: 25px;
}
</style>
