<template>
  <div>
    <p class="cg-base-text" v-if="adopter.send_to_friend">{{ $tc('default.stepper.certificate.gift.email', order.quantity) }}</p>
    <p class="cg-base-text" v-html="description"/>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";

export default {
  name: "final-friend-gift-adoption-step",
  mixins: [apiMixin, finalStepMixin],
  computed: {
    ...mapGetters({
      adopter: "getAdopter"
    }),
    description() {
      if (this.adopter.send_to_friend) {
        return this.$tc('default.stepper.finalFriendGift.description', this.order.quantity, {link: this.getGetUrl({gift_code: this.order.giftCode})})
      } else {
        return this.$tc('default.stepper.finalFriendGift.descriptionNoEmail', null, {link: this.getGetUrl({gift_code: this.order.giftCode})})
      }
    }
  }
}
</script>

<style scoped>

</style>
