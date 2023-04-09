<template>
  <div id="reef-adoption-step">
    <hint class="mb-10">
      <p
          class="cg-base-text"
          v-html="description"
      />
    </hint>

    <v-tabs
        v-model="tab"
        grow
        centered
        center-active
        active-class="tab-active"
        :vertical="windowWidth <= 450"
    >
      <v-tab
          v-for="(product, index) in products"
          @change="updateForm(product)"
          :key="index"
      >
        <span class="cg-base-text light text-no-transform">
          {{ $t('default.stepper.adoption.' + product.key + '.' + product.variant + '.title') }}
        </span>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="cg-base-text reef-tab">
      <v-tab-item
          v-for="(product, index) in products"
          :key="index"
          v-html="$t('default.stepper.adoption.' + product.key + '.' + product.variant + '.description')"
      />
    </v-tabs-items>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <adoption-count-block :options="localOptions"/>
    </v-form>
  </div>
</template>

<script>
import AdoptionStep from "@/components/forms/steps/AdoptionStep";
import adoptionMixin from "@/mixins/adoptionMixin";
import screenMixin from "@/mixins/screenMixin";
import validationMixin from "@/mixins/validationMixin";
import Hint from "@/components/utils/Hint.vue";
import fiscalReductionMixin from "@/mixins/fiscalReductionMixin";

export default {
  name: "reef-adoption-step",
  components: {Hint},
  extends: AdoptionStep,
  mixins: [adoptionMixin, screenMixin, validationMixin, fiscalReductionMixin],
  data() {
    return {
      tab: 0,
      reducedPrice: null
    }
  },
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
    localOptions() {
      let options = this.options;
      options.item = this.translation.item;
      if (this.count === this.maxCount) {
        options.displayAlert = true;
        options.message = this.$t('default.stepper.adoption.reef.max', {max: this.maxCount, item: this.plural.item})
        this.$vuetify.goTo('#deduction', {container: '#ReefAdoptionStep'})
      }
      return options
    },
    description() {
      return this.$t('default.stepper.adoption.description', {donation: this.order.price, reducedPrice: this.reducedPrice})
    }
  },
  methods: {
    updateForm(reefType) {
      let data = {
        selectedProduct: {
          ...reefType
        },
        order: {
          price: this.order.quantity * reefType.price
        },
        baseElementPrice: reefType.price
      }
      this.$store.dispatch("updateForm", data)
    },
  }
}
</script>

<style lang="scss" scoped>
.v-tab {
  font-size: 0.7rem;
}

.v-tabs-items {
  padding: 1rem 0;
  height: 50px;
}

.v-card {
  margin-bottom: 1rem;
}

.tab-active {
  .cg-base-text {
    color: $primary;
    font-weight: 700;
  }
}

.reef-tab {
  height: unset !important;
  text-align: center;
  padding: 20px;
}
</style>
