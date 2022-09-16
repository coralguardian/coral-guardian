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

                <component
                    :is="steps[index - 1].component"
                    v-bind="steps[index - 1].props"
                    v-if="steps[index - 1].component === currentStep.component && index === stepNumber"
                />

                <form-footer
                    class="mt-5"
                    v-if="currentStep.component !== 'AdopterTypeStep' && steps[index - 1].component === currentStep.component && index === stepNumber"
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
import components from "@/components/forms/full/steps";
import Step from "./components/utils/Step";

import {mapGetters, mapActions} from "vuex";
import redirectionMixin from "./mixins/redirectionMixin";
import {merge} from "lodash";
import SetupForm from "@/forms/full/setupForm";
// import fr from "@/locales/fr"
// import en from "@/locales/en"

export default {
  name: "full-form",
  mixins: [paymentMixin, redirectionMixin],
  components: {
    FormFooter,
    Step,
    ...components
  },
  props: {},
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
    }),
    compare(one, two) {
      merge(one, two)
      const data = JSON.stringify(one)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  },
  // methods: {
  //   hasPayment() {
  //     const clientSecret = new URLSearchParams(window.location.search).get(
  //         "payment_intent_client_secret"
  //     );
  //     if (!clientSecret) {
  //       return;
  //     }
  //     let data = localStorage.getItem(clientSecret);
  //     if (data) {
  //       data = JSON.parse(data)
  //       this.updateForm({target: data.target}).then(() => this.loadSetupNextSteps().then(() => this.updateForm(data)))
  //     } else {
  //       this.cleanLocalStorage()
  //     }
  //   }
  // },
  beforeCreate() {

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
    // this.compare(fr, en)
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