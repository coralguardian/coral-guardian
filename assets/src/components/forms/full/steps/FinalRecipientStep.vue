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
import {mapGetters} from "vuex";
import FinalStep from "@/components/forms/misc/FinalStep.vue";
import SendToFriendEnum from "@/enums/sendToFriendEnum";
import validationMixin from "@/mixins/validationMixin";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

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
      if (this.adopter.send_to_friend === SendToFriendEnum.later) {
        base += "later"
      } else if (this.adopter.send_to_friend === SendToFriendEnum.dont) {
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
