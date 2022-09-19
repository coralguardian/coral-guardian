<template>
  <div
      class="app-stepper-footer d-flex"
      :class="{justifyEnd: !displayPreviousButton, justifySpaceBetween: displayPreviousButton, flexColum: windowWidth <= 600}"
  >
    <v-btn
        v-if="displayPreviousButton"
        @click="decrementStep"
    >
      {{ $t("default.ui.previous") }}
    </v-btn>

    <v-btn
        v-if="currentStep.ignorable"
        @click="ignoreStep"
        color="primary"
    >
      {{ $t("default.ui.through") }}
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
  computed: {
    ...mapGetters({
      step: 'step',
      stepCount: 'stepCount',
      currentStep: 'getCurrentStep'
    }),
    displayPreviousButton() {
      return this.step > 1 && this.currentStep.back !== false && !this.customPreviousHide
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
        this.incrementStep().then(() => {
          this.customPreviousHide = false
        })
      }
    },
    ignoreStep() {
      this.$root.$emit("ignoreStep")
    }
  },
  mounted() {
    setTimeout(() => {
      this.$root.$on('StepValid', () => {
        if (this.currentStep.api) {
          this.$root.$emit(this.currentStep.component + 'Api')
        } else {
          this.incrementStep().then(() => {
            this.customPreviousHide = false
            this.isLoading = false
          })
        }
      })
      this.$root.$on('ApiValid', () => {
        this.incrementStep().then(() => {
          this.customPreviousHide = false
          this.isLoading = false
        })
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
  @media (max-width: 450px) {
    padding: 1rem 0;
  }
  padding: 1rem;
}

</style>