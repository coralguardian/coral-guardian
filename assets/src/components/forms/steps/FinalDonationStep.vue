<template>
  <final-step id="finalDonationStep">

    <template v-slot:hint>
      {{ $t("default.stepper.finalDonation.hint", {price: donation.price}) }}
    </template>

    <p
        class="cg-base-text light"
        v-if="donation.type === donationEnum.oneshot && paymentMethod === paymentMethodEnum.creditCard"
        v-html="$t('default.stepper.finalDonation.description')"
    />
    <p
        class="cg-base-text light"
        v-else-if="donation.type === donationEnum.monthly"
        v-html="$t('default.stepper.finalRecurrentDonation.description')"
    />
    <p
        class="cg-base-text light"
        v-else-if="paymentMethod === paymentMethodEnum.bankTransfer"
    >
      {{ $t('default.stepper.finalDonation.bankTransfer') }}
    </p>

  </final-step>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import DonationEnum from "@/enums/donationEnum";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "final-donation-step",
  mixins: [apiMixin, finalStepMixin],
  components: {
    FinalStep
  },
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
  }
}
</script>

<style scoped>

</style>
