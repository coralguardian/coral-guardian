<template>
  <final-step id="finalDonationStep">

    <template v-slot:hint>
      {{ $t("default.stepper.finalDonation.hint", {price: donation.price}) }}
    </template>

    <p
        class="cg-base-text light"
        v-if="donation.type === donationEnum.oneshot"
        v-html="$t('default.stepper.finalDonation.description')"
    />
    <p
        class="cg-base-text light"
        v-else-if="donation.type === donationEnum.monthly"
        v-html="$t('default.stepper.finalRecurrentDonation.description')"
    />

  </final-step>
</template>

<script>
import {mapGetters} from "vuex";
import DonationEnum from "@/enums/donationEnum";
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "final-donation-step",
  components: {
    FinalStep
  },
  computed: {
    ...mapGetters({
      donation: "getDonation"
    }),
    donationEnum() {
      return DonationEnum
    }
  }
}
</script>

<style scoped>

</style>
