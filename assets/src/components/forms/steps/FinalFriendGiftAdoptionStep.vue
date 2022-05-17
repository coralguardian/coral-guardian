<template>
  <div>
    <p v-html="$tc('default.stepper.finalFriendGift.description', order.quantity, {link: this.getGetUrl({order_id: order.id})})"/>

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
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "final-friend-gift-adoption-step",
  mixins: [apiMixin, finalStepMixin, validationMixin],
  components: {
    DonationBlock
  }
}
</script>

<style scoped>

</style>