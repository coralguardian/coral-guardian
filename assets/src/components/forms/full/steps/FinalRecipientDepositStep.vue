<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.finalRecipient.hint", {count: order.quantity, item: translation.item}) }}
    </template>

    <p class="cg-base-text light" v-html="description"/>

  </final-step>
</template>

<script>
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import FinalStep from "@/components/forms/misc/FinalStep.vue";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "final-recipient-deposit-step",
  components: {
    FinalStep
  },
  mixins: [finalStepMixin, itemTranslationMixin],
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      gift: "getGift"
    }),
    description() {
      let base = 'default.stepper.finalDeposit.recipient.description.';
      base += this.gift.toSendOn === null ? "base" : "scheduled"

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
