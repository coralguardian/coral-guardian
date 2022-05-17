<template>
  <div>

    <p class="pb-2" v-html="$t('default.stepper.adoption.description', {donation: order.price}) "/>

    <adoption-count-block :options="localOptions" :big="true"/>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import AdoptionStep from "@/components/forms/steps/AdoptionStep";
import {isEmpty} from "lodash";

export default {
  name: "coral-adoption-step",
  extends: AdoptionStep,
  computed: {
    ...mapState({
      interval: 'interval'
    }),
    ...mapGetters({
      donatorNature: 'getDonatorNature'
    }),
    localOptions () {
      let options = this.options;
      options.item = this.translation.item;
      if (!isEmpty(this.interval) && this.order.quantity >= this.interval.min && this.order.quantity <= this.interval.max) {
        options.displayAlert = true;
        options.message = this.$t('default.stepper.adoption.corals.hint.' + this.donatorNature, {max: this.maxCount, item: this.plural.item})
        this.$vuetify.goTo('#deduction', { container: '#CoralAdoptionStep' })
      }
      return options
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