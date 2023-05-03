<template>
  <v-app>
    <div id="full-form" class="new-form-container">

      <div
          v-if="checkingForPayment"
          class="spinner-container"
      >
        <v-progress-circular color="primary" indeterminate/>
        <p class="cg-base-text">
          {{ $t('default.stepper.payment.checking') }}
        </p>
      </div>

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
                        :step="steps[index - 1]"
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
import missingTranslationsMixin from "@/mixins/missingTranslationsMixin";
import components from "@/components/forms/full/steps";
import Step from "./components/utils/Step";

import {mapGetters, mapActions} from "vuex";
import StepperHeaderProgress from "@/components/utils/StepperHeaderProgress.vue";
import paymentCheckMixin from "@/mixins/paymentCheckMixin";
import PaymentStatusEnum from "@/enums/paymentStatusEnum";
import GtagService from "@/services/gtagService";
import fillStateMixin from "@/mixins/fillStateMixin";

export default {
  name: "full-form",
  mixins: [paymentCheckMixin, missingTranslationsMixin, fillStateMixin],
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
      order: "getOrder",
      adopter: "getAdopter"
    }),
    topStepper() {
      return this.currentStep.number
    }
  },
  methods: {
    ...mapActions({
      startForm: "startForm",
      incrementStep: "incrementStep"
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
    },
    checkForPayment() {
      this.checkForPaymentIntent()
        .then((status) => {
          if (status === PaymentStatusEnum.succeeded) {
            // redirige dernière étape
            (new GtagService()).executeTag(this.order, 'adoption', this.adopter);
            this.incrementStep().then(() => {
              setTimeout(() => {
                this.checkingForPayment = false
              }, 200)
              setTimeout(() => {
                this.$vuetify.goTo('#FinalStep', {offset: 400})
              }, 200)
            })
          } else if (status === PaymentStatusEnum.error) {
            this.checkingForPayment = false
            // on laisse le cour normal via forceUpdate on retourne à l'étape de payment
          } else {
            // il n'y avait pas de query param de paiement, on fait un nouveau form
            this.startSetupForm()
          }
        })
        .catch(() => {
          // les données n'ont pas été retrouvées dans le localStorage
          this.startSetupForm()
        })
    },
    startSetupForm() {
      this.fillState()
        .then(() => {
          this.startForm()
            .catch(error => {
              alert(this.$t(error ? "default.errors." + error : 'default.errors.base'))
            })
            .finally(() => this.checkingForPayment = false)
        })
    }
  },
  beforeMount() {
    this.checkForPayment()
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

    .spinner-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400px;
    }

    .v-stepper {
      border-radius: 30px !important;
      box-shadow: unset !important;

      .v-stepper__header {
        justify-content: unset !important;

        @media (max-width: 800px) {
          justify-content: space-between !important;
        }

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
    @media #{map-get($display-breakpoints, 'xs-only')} {
      padding: 0 1rem !important;
    }

    &.large-step {
      max-width: 700px !important;
    }
  }
}
</style>
