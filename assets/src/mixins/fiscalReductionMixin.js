import {mapGetters} from "vuex";
import FiscalEnum from "@/enums/fiscalEnum";

export default {
  computed: {
    ...mapGetters({
      adopter: 'getAdopter'
    }),
    fiscalReduction() {
      const fiscalReductions = FiscalEnum
      if (!FiscalEnum.isPropertyValid(this.adopter.type)) {
        throw "Cette réduction fiscale n'existe pas !"
      }
      return fiscalReductions[this.adopter.type]
    }
  },
  methods: {
    getFormattedDeduction(price) {
      let deduction = this.fiscalReduction * price
      let finalPrice = price - deduction;

      if (!Number.isInteger(finalPrice)) {
        finalPrice = finalPrice.toFixed(2)
      }

      return finalPrice
    }
  }
}
