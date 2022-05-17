<template>
  <p id="deduction" v-html="$t('default.deduction.description', options)" :class="{'text-body-1': big}"/>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "deduction",
  props: {
    donation: {
      types: Number,
      default: 0
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      fiscalReduction: 'getFiscalReduction'
    }),
    options() {
      return {
        donation: this.donation,
        deduction: this.getFormattedDeduction
      }
    },
    getFormattedDeduction () {
      let deduction = this.fiscalReduction * this.donation

      let finalPrice = this.donation - deduction;

      if (!Number.isInteger(finalPrice)) {
        finalPrice = finalPrice.toFixed(2)
      }

      return finalPrice
    }
  }
}
</script>

<style scoped>
#deduction {
  display: block;
  text-align: center;
}
</style>