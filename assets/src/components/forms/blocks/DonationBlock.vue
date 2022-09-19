<template>
  <div id="donationBlock" class="d-flex justify-center align-center">

    <div>
      <div>
        <price-button
            v-for="price in prices"
            :title="price + ' €'"
            @click="updateCustomAmount(price)"
            :key="price"
        />
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
    prices: {
      type: Array,
      default: () => [5, 10, 20, 50]
    },
    min: {
      type: Number,
      default: 0
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
    this.$refs.customAmount.setMinInput(this.min)
  }
}
</script>

<style scoped>

</style>