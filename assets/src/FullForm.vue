<template>
  <v-app>
    <div id="full-form">
      <v-progress-circular color="tertiary" indeterminate v-if="loading"/>

      <v-stepper
          v-else
          v-model="stepNumber"
          vertical
      >
        <div v-for="index in stepCount" :key="index">

          <v-stepper-step
              v-show="!steps[index - 1].tab.hide || stepNumber >= index"
              color="tertiary"
              :complete="stepNumber > index"
              :step="index"
              :key="'tab' + index"
          >
            {{ $t(steps[index - 1].tab.title) }}
          </v-stepper-step>

          <v-stepper-content
              :step="index"
              :key="'step' + index"
          >
            <transition
                name="fade"
                v-if="steps[index - 1].component === currentStep.component && index === stepNumber"
            >

              <step
                  :class="steps[index - 1].larger ? 'large-step' : ''"
                  :title="steps[index - 1].title ? steps[index - 1].title : ''"
                  :is-singular="steps[index - 1].singularTitle"
                  :is-specific="steps[index - 1].specificTitle"
                  :id="steps[index - 1].component"
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
                    v-if="steps[index - 1].component === currentStep.component && index === stepNumber"
                    :offset="steps[index - 1].offset ? steps[index - 1].offset : 400"
                />
              </step>

            </transition>

          </v-stepper-content>

        </div>

      </v-stepper>
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

export default {
  name: "full-form",
  mixins: [paymentMixin, redirectionMixin, missingTranslationsMixin],
  components: {
    FormFooter,
    Step,
    ...components
  },
  props: {},
  data() {
    return {
      displayAlert: false,
      alert: ""
    }
  },
  computed: {
    ...mapGetters({
      steps: 'getSteps',
      stepNumber: "step",
      currentStep: "getCurrentStep",
      stepCount: "stepCount"
    })
  },
  methods: {
    ...mapActions({
      loadForm: "loadForm"
    })
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

  .form-step {
    max-width: 550px !important;
    margin: auto !important;
    height: auto !important;

    &.large-step {
      max-width: 700px !important;
    }

  }
}
</style>
