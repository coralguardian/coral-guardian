<template>
  <div>
    <hint class="mb-10">
      <p
          class="cg-base-text"
          v-html="description"
      />
    </hint>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <adoption-count-block :options="localOptions"/>
    </v-form>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AdoptionStep from "@/components/forms/steps/AdoptionStep";
import {isEmpty} from "lodash";
import Hint from "@/components/utils/Hint.vue";
import validationMixin from "@/mixins/validationMixin";
import fiscalReductionMixin from "@/mixins/fiscalReductionMixin";

export default {
  name: "coral-adoption-step",
  components: {
    Hint
  },
  mixins: [validationMixin, fiscalReductionMixin],
  extends: AdoptionStep,
  watch: {
    order: {
      deep: true,
      immediate: true,
      handler(value) {
        this.reducedPrice = this.getFormattedDeduction(value.price)
      }
    }
  },
  computed: {
    ...mapState({
      interval: 'interval'
    }),
    localOptions() {
      let options = this.options;
      options.item = this.translation.item;
      if (!isEmpty(this.interval) && this.order.quantity >= this.interval.min && this.order.quantity <= this.interval.max) {
        options.displayAlert = true;
        options.message = this.$t('default.stepper.adoption.corals.hint.individual', {
          max: this.maxCount,
          item: this.plural.item
        })
      }
      return options
    },
    description() {
      return this.$t('default.stepper.adoption.description', {donation: this.order.price, reducedPrice: this.reducedPrice})
    }
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  margin: 1rem 0;
  border-width: 1px;
}

.v-tab {
  font-size: 0.7rem;
}

.v-tabs-items {
  padding: 1rem 0.5rem;
}
</style>
