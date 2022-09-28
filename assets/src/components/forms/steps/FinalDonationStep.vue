<template>
  <div>
    <p v-if="donation.type === donationEnum.oneshot && paymentMethod === paymentMethodEnum.creditCard" v-html="$t('default.stepper.finalDonation.description')" />
    <p v-else-if="donation.type === donationEnum.monthly" v-html="$t('default.stepper.finalRecurrentDonation.description')"/>
    <p v-else-if="paymentMethod === paymentMethodEnum.bankTransfer">
      {{$t('default.stepper.finalDonation.bankTransfer')}}
    </p>
  </div>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import paymentMixin from "../../../mixins/paymentMixin";
import DonationEnum from "@/enums/donationEnum";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

export default {
  name: "final-donation-step",
  mixins: [apiMixin, finalStepMixin, paymentMixin],
  computed: {
    ...mapGetters({
      donation: "getDonation",
      paymentMethod: "getPaymentMethod"
    }),
    donationEnum() {
      return DonationEnum
    },
    paymentMethodEnum() {
      return PaymentMethodEnum
    }
  },
  mounted() {
    this.cleanLocalStorage()
  }
}
</script>

<style scoped>

</style>