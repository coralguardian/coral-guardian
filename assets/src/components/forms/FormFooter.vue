<template>
  <div
      class="app-stepper-footer d-flex"
      :class="!displayPreviousButton ? 'justify-end': 'justify-space-between'"
  >
    <v-btn
        v-if="displayPreviousButton"
        @click="decrementStep"
    >
      {{ $t("default.ui.previous") }}
    </v-btn>

    <v-btn
        v-if="!currentStep.isLast"
        class="black--text align-self-end"
        color="secondary"
        :loading="isLoading"
        @click="validate"
    >
      {{ $t("default.ui.continue") }}
    </v-btn>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "form-footer",
  data() {
    return {
      isLoading: false,
      customPreviousHide: false
    }
  },
  computed: {
    ...mapGetters({
      step: 'step',
      stepCount: 'stepCount',
      currentStep: 'getCurrentStep'
    }),
    displayPreviousButton() {
      return this.step > 0 && this.currentStep.back !== false && !this.customPreviousHide
    }
  },
  methods: {
    ...mapActions({
      incrementStep: "incrementStep",
      decrementStep: "decrementStep"
    }),
    validate() {
      if (this.currentStep.validate) {
        this.isLoading = true;
        this.$root.$emit(this.currentStep.component + 'Validation', this.currentStep.customValidation)
      } else {
        this.customPreviousHide = false
        this.incrementStep()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$root.$on('StepValid', () => {
        if (this.currentStep.api) {
          this.$root.$emit(this.currentStep.component + 'Api')
        } else {
          this.customPreviousHide = false
          this.isLoading = false
          this.incrementStep()
        }
      })
      this.$root.$on('ApiValid', () => {
        this.customPreviousHide = false
        this.isLoading = false
        this.incrementStep()
      })
      this.$root.$on('IsLoaded', () => {
        this.customPreviousHide = false
        this.isLoading = false
      })
      this.$root.$on('hidePreviousButton', () => this.customPreviousHide = true)
    }, 100)
  },
  beforeDestroy() {
    this.$root.$off('StepValid')
    this.$root.$off('ApiValid')
    this.$root.$off('IsLoaded')
    this.$root.$off('hidePreviousButton')
  }
}
</script>

<style lang="scss" scoped>

.app-stepper-footer {
  padding: 1rem;
}

</style>