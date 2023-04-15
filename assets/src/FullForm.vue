<template>
  <v-app>
    <div id="full-form">
      <v-progress-circular color="tertiary" indeterminate v-if="loading"/>

      <div v-else>

        <v-stepper
            v-if="currentStep.number"
            elevation="0"
            v-model="topStepper"
            class="stepper-top"
        >
          <v-stepper-header>
            <div v-for="index in stepCount" :key="index">
              <div class="step-header-container">
                <v-stepper-step
                    :complete="isCompleted(index)"
                    :step="index"
                    :key="'tab' + index"
                />
                <stepper-header-progress
                    v-if="index < stepCount"
                    :state="getState(index)"
                />
              </div>
            </div>
          </v-stepper-header>
        </v-stepper>

        <v-divider
            v-if="currentStep.number"
            class="cg-divider"
        />

        <v-stepper
            v-model="stepNumber"
            elevation="0"
            :class="{'stepper-bottom': currentStep.number}"
        >
          <v-stepper-items>

            <div v-for="index in dynamicStepCount" :key="index">

              <v-stepper-content
                  :step="index"
                  :key="'step' + index"
              >
                <transition
                    name="fade"
                    v-if="steps[index - 1].component === currentStep.component && index === stepNumber"
                >

                  <step
                      :is-singular="steps[index - 1].singularTitle"
                      :is-specific="steps[index - 1].specificTitle"
                      :id="steps[index - 1].component"
                      :step="steps[index - 1]"
                  >

                    <transition name="fade">
                      <v-alert
                          v-if="displayAlert"
                          class="tooltip white--text"
                          color="red"
                          dismissible
                      >{{ $t(alert, {singular}) }}
                      </v-alert>
                    </transition>

                    <component
                        :is="steps[index - 1].component"
                        v-bind="steps[index - 1].props"
                        v-if="steps[index - 1].component === currentStep.component && index === stepNumber"
                    />

                    <form-footer
                        class="mt-5"
                        v-if="displayFooter(index)"
                        :offset="steps[index - 1].offset ? steps[index - 1].offset : 400"
                    />
                  </step>

                </transition>

              </v-stepper-content>

            </div>
          </v-stepper-items>

        </v-stepper>
      </div>
    </div>
  </v-app>
</template>

<script>
import FormFooter from "./components/forms/FormFooter";
import paymentMixin from "./mixins/paymentMixin";
import missingTranslationsMixin from "@/mixins/missingTranslationsMixin";
import components from "@/components/forms/full/steps";
import Step from "./components/utils/Step";

import {mapGetters, mapActions} from "vuex";
import redirectionMixin from "./mixins/redirectionMixin";
import SetupForm from "@/forms/full/setupForm";
import StepperHeaderProgress from "@/components/utils/StepperHeaderProgress.vue";

export default {
  name: "full-form",
  mixins: [paymentMixin, redirectionMixin, missingTranslationsMixin],
  components: {
    StepperHeaderProgress,
    FormFooter,
    Step,
    ...components
  },
  props: {},
  data() {
    return {
      displayAlert: false,
      alert: "",
      stepCount: 6
    }
  },
  computed: {
    ...mapGetters({
      steps: 'getSteps',
      stepNumber: "step",
      currentStep: "getCurrentStep",
      dynamicStepCount: "stepCount",
    }),
    topStepper() {
      return this.currentStep.number
    }
  },
  methods: {
    ...mapActions({
      loadForm: "loadForm"
    }),
    isCompleted(index) {
      return this.topStepper > index
    },
    getState(index) {
      if (this.isCompleted(index)) {
        return 'completed'
      }
      if (this.topStepper === index) {
        return 'progress'
      }
      return '';
    },
    displayFooter(index) {
      let step = this.steps[index - 1];
      return (step.back || !step.isLast) && step.component === this.currentStep.component && index === this.stepNumber
    }
  },
  created() {
    this.fillState()
  },
  beforeMount() {
    if (this.handleRedirection() === false) {
      this.loadForm(new SetupForm())
    }
  },
  mounted() {
    this.$root.$on('displayError', (payload) => {
      this.alert = payload ? "default.errors." + payload : 'default.errors.base'
      this.displayAlert = true
      this.$root.$emit("IsLoaded")
      setTimeout(() => {
        this.displayAlert = false
      }, 5000)
    })
  }
}
</script>

<style lang="scss" scoped>
.v-application {
  background: transparent !important;

  #full-form {
    width: 760px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid #EFF0F7;
    border-radius: 30px;
    text-align: left;

    .v-stepper {
      border-radius: 30px !important;
      box-shadow: unset !important;

      .v-stepper__header {
        justify-content: unset !important;
        box-shadow: unset !important;
        padding: 20px 12px 8px;
        height: unset !important;
      }

      &.stepper-top {
        border-bottom-left-radius: unset !important;
        border-bottom-right-radius: unset !important;
      }

      &.stepper-bottom {
        border-top-left-radius: unset !important;
        border-top-right-radius: unset !important;
      }
    }
  }

  .form-step {
    &.large-step {
      max-width: 700px !important;
    }

  }
}
</style>
