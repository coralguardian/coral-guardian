<template>
  <div>
    <p v-if="adopter.send_to_friend">{{ $tc('default.stepper.certificate.gift.email', order.quantity) }}</p>
    <p v-html="description"/>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <donation-block final :min="1"/>
    </v-form>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import validationMixin from "../../../mixins/validationMixin";
import paymentMixin from "@/mixins/paymentMixin";
import {mapGetters} from "vuex";

export default {
  name: "final-friend-gift-adoption-step",
  mixins: [apiMixin, finalStepMixin, validationMixin, paymentMixin],
  components: {
    DonationBlock
  },
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
  },
  mounted() {
    this.cleanLocalStorage()
  }
}
</script>

<style scoped>

</style>