<template>
  <p id="deduction" class="cg-base-text" v-html="$t('default.deduction.description', options)"/>
</template>

<script>
import {mapGetters} from "vuex";
import FiscalEnum from "@/enums/fiscalEnum";

export default {
  name: "deduction",
  computed: {
    ...mapGetters({
      adopter: 'getAdopter',
      donation: 'getDonation'
    }),
    fiscalReduction() {
      const fiscalReductions = FiscalEnum
      if (!FiscalEnum.isPropertyValid(this.adopter.type)) {
        throw "Cette réduction fiscale n'existe pas !"
      }
      return fiscalReductions[this.adopter.type]
    },
    options() {
      return {
        donation: this.donation.price,
        deduction: this.getFormattedDeduction,
        type: this.$t('default.' + this.donation.type)
      }
    },
    getFormattedDeduction () {
      let deduction = this.fiscalReduction * this.donation.price
      let finalPrice = this.donation.price - deduction;

      if (!Number.isInteger(finalPrice)) {
        finalPrice = finalPrice.toFixed(2)
      }

      return finalPrice
    }
  }
}
</script>

<style lang="scss">
#deduction {
  color: #6F6C90;
  line-height: 30px;
  text-align: left;
}
</style>
