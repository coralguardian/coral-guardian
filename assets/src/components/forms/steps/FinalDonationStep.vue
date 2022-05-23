<template>
  <div>
    <p v-if="donation.type === donationEnum.oneshot && donation.payment_method.type === 'credit_card'" v-html="$t('default.stepper.finalDonation.description')" />
    <p v-else-if="donation.type === donationEnum.monthly" v-html="$t('default.stepper.finalRecurrentDonation.description')"/>
    <p v-else-if="donation.payment_method.type === 'bank_transfert'">
      {{$t('default.stepper.finalDonation.bankTransfer')}}
    </p>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import paymentMixin from "../../../mixins/paymentMixin";

export default {
  name: "final-donation-step",
  mixins: [apiMixin, finalStepMixin, paymentMixin],
  computed: {
    ...mapGetters({
      donation: "getDonation",
      donationEnum: "getDonationEnum"
    })
  },
  mounted() {
    this.cleanLocalStorage()
  }
}
</script>

<style scoped>

</style>