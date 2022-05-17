<template>
  <div id="reef-adoption-step">
    <v-tabs
        v-model="tab"
        grow
        hide-slider
        centered
        center-active
        color="tertiary"
        active-class="tab-active"
    >
      <v-tab @click="updateForm(reefs.lady)">{{ $t('default.stepper.adoption.reefs.lady.title') }}</v-tab>
      <v-tab @click="updateForm(reefs.butterfly)">{{ $t('default.stepper.adoption.reefs.butterfly.title') }}</v-tab>
      <v-tab @click="updateForm(reefs.napoleon)">{{ $t('default.stepper.adoption.reefs.napoleon.title') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="text-body-2">
      <v-tab-item v-html="$t('default.stepper.adoption.reefs.lady.description')"/>
      <v-tab-item v-html="$t('default.stepper.adoption.reefs.butterfly.description')"/>
      <v-tab-item v-html="$t('default.stepper.adoption.reefs.napoleon.description')"/>
    </v-tabs-items>

    <adoption-count-block :options="localOptions"/>

  </div>
</template>

<script>
import AdoptionStep from "@/components/forms/steps/AdoptionStep";
import adoptionMixin from "@/mixins/adoptionMixin";

export default {
  name: "reef-adoption-step",
  extends: AdoptionStep,
  mixins: [adoptionMixin],
  data() {
    return {
      tab: 0
    }
  },
  computed: {
    localOptions () {
      let options = this.options;
      options.item = this.translation.item;
      if (this.count === this.maxCount) {
        options.displayAlert = true;
        options.message = this.$t('default.stepper.adoption.reefs.max', {max: this.maxCount, item: this.plural.item})
        this.$vuetify.goTo('#deduction', { container: '#ReefAdoptionStep' })
      }
      return options
    }
  },
  methods: {
    updateForm(reefType) {
      let data = {
        ...reefType,
        order: {
          price: this.order.quantity * reefType.baseElementPrice
        }
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
  text-decoration: underline;
  font-weight: 900;
}
</style>