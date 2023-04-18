<template>
  <div>
    <p v-html="$t('default.stepper.finalFriendAdoption.description', {orderToken: order.giftCode})"/>
    <social-share-block/>
  </div>
</template>

<script>
import finalStepMixin from "@/mixins/finalStepMixin";
import SocialShareBlock from "../forms/blocks/SocialShareBlock.vue";
import paymentMixin from "../../mixins/paymentMixin";
import validationMixin from "../../mixins/validationMixin";
import apiMixin from "@/mixins/apiMixin";

export default {
  name: "final-friend-adoption-step",
  components: {
    SocialShareBlock
  },
  mixins: [apiMixin, finalStepMixin, paymentMixin, validationMixin],
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
