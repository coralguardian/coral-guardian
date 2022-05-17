<template>
  <div id="donationBlock" class="d-flex justify-center align-center">

    <div>
      <div v-if="final">
        <p class="mt-5">* * * * * * *</p>
        <p class="text-subtitle-1 font-weight-bold mt-4">
          {{ $t('default.donation.monthly.description') }}
        </p>
      </div>

      <div>
        <price-button title="5 €" @click="updateCustomAmount(5)"/>
        <price-button title="10 €" @click="updateCustomAmount(10)"/>
        <price-button title="20 €" @click="updateCustomAmount(20)"/>
        <price-button title="50 €" @click="updateCustomAmount(50)"/>
      </div>

      <custom-amount
          ref="customAmount"
          :value="donation.price"
          :hint="false"
          @input="updateForm({donation: {price: $event}})"
      />

      <deduction :donation="donation.price"/>
    </div>

  </div>
</template>

<script>
import Deduction from "@/components/utils/Deduction";
import CustomAmount from "@/components/utils/CustomAmount";
import PriceButton from "@/components/utils/PriceButton";
import {mapActions, mapGetters} from "vuex";
import ValidationMixin from "@/mixins/validationMixin";

export default {
  name: "donation-block",
  components: {
    Deduction,
    CustomAmount,
    PriceButton
  },
  mixins: [ValidationMixin],
  props: {
    final: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'getCurrentStep',
      donation: 'getDonation'
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
    updateCustomAmount(amount) {
      this.updateForm({donation: {price: amount}})
      this.$vuetify.goTo('#deduction', {container: '#' + this.currentStep.component})
    }
  },
  mounted() {
    this.$refs.customAmount.setMinInput(0)
  }
}
</script>

<style scoped>

</style>