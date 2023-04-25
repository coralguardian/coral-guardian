<template>
  <div
      class="app-stepper-footer d-flex"
      :class="{'justify-end': !displayPreviousButton, 'justify-space-between': displayPreviousButton, 'flex-column': windowWidth <= 600}"
  >
    <v-btn
        v-if="displayPreviousButton"
        class="cg-btn previous"
        elevation="0"
        @click="previousStep"
    >
        <v-icon color="primary">
            mdi-arrow-left
        </v-icon>
      {{ $t("default.ui.previous") }}
    </v-btn>

    <v-btn
        v-if="currentStep.ignorable"
        depressed
        @click="ignoreStep"
        color="transparent"
        class="ignore-button"
    >
      {{ $t("default.ui.through") }}
    </v-btn>

    <v-btn
        v-if="!currentStep.isLast"
        elevation="0"
        class="cg-btn"
        :class="{'align-self-end': !displayPreviousButton}"
        color="primary"
        :loading="isLoading"
        @click="validate"
        rounded
    >
      {{ continueLabel }}
    </v-btn>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import screenMixin from "@/mixins/screenMixin";

export default {
  name: "form-footer",
  mixins: [screenMixin],
  data() {
    return {
      isLoading: false,
      customPreviousHide: false
    }
  },
  props: {
    // pour prévenir de clear les events lorsque le form footer est permanent d'une étape à une autre
    destroy: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    ...mapGetters({
      step: 'step',
      stepCount: 'stepCount',
      currentStep: 'getCurrentStep',
      isFormInitialized: 'isInitialized'
    }),
    displayPreviousButton() {
      return this.step > 1 && this.currentStep.back !== false && !this.customPreviousHide
    },
    continueLabel() {
      return this.currentStep.continueButtonLabel ? this.$t("default.ui." + this.currentStep.continueButtonLabel) : this.$t("default.ui.continue")
    }
  },
  methods: {
    ...mapActions({
      incrementStep: "incrementStep",
      decrementStep: "decrementStep",
      initializeForm: "initializeForm"
    }),
    validate() {
      if (this.currentStep.validate) {
        this.isLoading = true;
        this.$root.$emit(this.currentStep.component + 'Validation', this.currentStep.customValidation)
      } else {
        this.customPreviousHide = false
        this.nextStep()
      }
    },
    ignoreStep() {
      this.$root.$emit("ignoreStep")
    },
    clearEvents() {
      if (this.destroy) {
        this.$root.$off('StepValid')
        this.$root.$off('ApiValid')
        this.$root.$off('IsLoaded')
        this.$root.$off('hidePreviousButton')
      }
    },
    previousStep() {
      this.clearEvents()
      this.decrementStep()
    },
    nextStep() {
      this.clearEvents()
      this.incrementStep().then(() => {
        this.customPreviousHide = false
        this.isLoading = false
        this.moveToTop()
      })
    },
    moveToTop() {
      setTimeout(() => {
        this.$vuetify.goTo('#' + this.currentStep.component, {offset: this.windowWidth <= 600 ? 200 : 300})
      }, 200)
    }
  },
  mounted() {
    if (this.isFormInitialized) {
      this.moveToTop()
    } else {
      this.initializeForm()
    }
    this.$root.$on('StepValid', () => {
      if (this.currentStep.api) {
        this.$root.$emit(this.currentStep.component + 'Api')
      } else {
        this.nextStep()
      }
    })
    this.$root.$on('ApiValid', () => {
      this.nextStep()
    })
    this.$root.$on('IsLoaded', () => {
      if (this.displayPreviousButton) {
        this.customPreviousHide = false
      }
      this.isLoading = false
    })
    this.$root.$on('hidePreviousButton', () => this.customPreviousHide = true)
  }
}
</script>

<style lang="scss" scoped>

.app-stepper-footer {
  @media (max-width: 450px) {
    padding: 1rem 0;
  }
  padding-bottom: 40px;
  padding-top: 20px;
  align-items: center;
}

.ignore-button {
  text-transform: unset;
  font-size: 16px !important;
  line-height: 24px !important;
  color: $primary !important;
}
</style>
