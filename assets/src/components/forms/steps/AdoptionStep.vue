<template>
  <!--Obligé de les ajouter même s'ils ne seront jamais affiché cause eslint-->
  <div>
    <hint/>
    <adoption-count-block/>
  </div>
</template>

<script>
import AdoptionCountBlock from "@/components/forms/blocks/AdoptionCountBlock";
import {mapGetters} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import fiscalReductionMixin from "@/mixins/fiscalReductionMixin";
import Hint from "@/components/utils/Hint.vue";
import ValidationMixin from "@/mixins/validationMixin";

export default {
  name: "adoption-step",
  components: {
    AdoptionCountBlock,
    Hint
  },
  mixins: [itemTranslationMixin, fiscalReductionMixin, ValidationMixin],
  watch: {
    order: {
      deep: true,
      immediate: true,
      handler(value) {
        this.reducedPrice = this.getFormattedDeduction(value.price)
      }
    }
  },
  data() {
    return {
      reducedPrice: null
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      products: "getProducts"
    }),
    description() {
      return this.$t('default.stepper.adoption.description', {
        donation: this.order.price,
        reducedPrice: this.reducedPrice
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
