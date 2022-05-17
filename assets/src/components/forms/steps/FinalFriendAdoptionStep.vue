<template>
  <div>
    <p v-html="$t('default.stepper.finalFriendAdoption.description', {orderToken: order.giftCode})"/>
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
import finalStepMixin from "@/mixins/finalStepMixin";
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import SocialShareBlock from "../blocks/SocialShareBlock";
import paymentMixin from "../../../mixins/paymentMixin";
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "final-friend-adoption-step",
  components: {
    DonationBlock,
    SocialShareBlock
  },
  mixins: [finalStepMixin, paymentMixin, validationMixin],
  mounted() {
    this.cleanLocalStorage()
  }
}
</script>

<style scoped>

</style>