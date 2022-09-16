<template>
  <adoption-count-block :options="options" big/>
</template>

<script>
import AdoptionCountBlock from "@/components/forms/blocks/AdoptionCountBlock";
import {mapGetters, mapState} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "adoption-step",
  components: {
    AdoptionCountBlock
  },
  mixins: [itemTranslationMixin],
  computed: {
    ...mapGetters({
      order: "getOrder",
      products: "getProducts"
    }),
    ...mapState({
      maxCount: state => state.data.max
    }),
    options() {
      return {
        maxCount: this.maxCount,
        count: this.order.quantity
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>