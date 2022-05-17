<template>

  <div class="d-flex justify-center">

    <div class="form-container">

      <transition name="fade">
        <v-alert
            v-if="displayAlert"
            class="tooltip white--text"
            color="red"
            dismissible
        >{{ $t(alert, {singular}) }}
        </v-alert>
      </transition>

      <v-tabs
          v-show="currentStep.component !== 'ChoiceStep'"
          :value="stepNumber"
          background-color="primary"
          grow
          centered
          center-active
          active-class="step-active"
          hide-slider
      >

        <v-tab
            v-for="(tab, index) in tabs"
            v-show="tab.visible"
            class="text-no-transform"
            :class="tab.class ? tab.class : ''"
            :key="index"
            disabled
        >
          <span v-if="tab.title">{{ $t(tab.title) }}</span>
        </v-tab>

      </v-tabs>

      <v-tabs-items :value="stepNumber" touchless>

        <v-tab-item
            v-for="(step, index) in steps"
            :key="index"
        >
          <step :title="step.title" :is-singular="step.singularTitle" :is-specific="step.specificTitle"
                :class="step.classes" :id="step.component">

            <component v-bind:is="step.component" v-bind="step.props" v-if="step.component === currentStep.component && index === stepNumber"/>

          </step>

        </v-tab-item>

      </v-tabs-items>

      <form-footer v-if="currentStep.component !== 'ChoiceStep'"/>

    </div>

  </div>

</template>

<script>
import FormFooter from "@/components/forms/FormFooter";
import Step from "@/components/utils/Step";
import Incrementor from "@/components/utils/Incrementor";
import AdoptionMixin from "@/mixins/adoptionMixin";
import {mapGetters} from 'vuex'
import components from "@/components/forms/steps"
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "base-form",
  components: {
    FormFooter,
    Step,
    Incrementor,
    ...components
  },
  mixins: [AdoptionMixin, itemTranslationMixin],
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: prop => Array.isArray(prop) && prop.every(tab => {
        // eslint-disable-next-line no-prototype-builtins
        return tab instanceof Object && tab.hasOwnProperty('visible') && tab.hasOwnProperty('title')
      })
    },
    steps: {
      type: Array,
      required: true,
      validator: prop => Array.isArray(prop) && prop.every(step => {
        // eslint-disable-next-line no-prototype-builtins
        return step instanceof Object && step.hasOwnProperty('title') && step.hasOwnProperty('component')
      })
    }
  },
  computed: {
    ...mapGetters({
      stepNumber: 'step',
      currentStep: "getCurrentStep",
      defaultTranslation: "getDefaultTranslation"
    })
  },
  data() {
    return {
      componentName: this.steps[0].component,
      displayAlert: false,
      alert: ""
    }
  },
  mounted() {
    this.$root.$on('displayError', (payload) => {
      this.alert = payload ? "default.errors." + payload : 'default.errors.base'
      this.displayAlert = true
      setTimeout(() => {
        this.displayAlert = false
      }, 5000)
    })
  }
}
</script>

<style lang="scss" scoped>

.form-container {
  width: 475px;
  height: $form-height;
  border: 2px solid $primary;
  border-radius: $base-border-radius;
  background: white;
  position: relative;
}

@media (max-width: 450px) {
  .form-container {
    width: 100vw;
  }
}

.v-tabs {
  border-top-left-radius: 4% !important;
  border-top-right-radius: 4% !important;
  background: $primary;
}

.v-tabs-items {
  border-radius: $base-border-radius;
}

.v-window-item:not(first-child) {
  height: calc(#{$form-height} - 116px);
}

.v-tab {
  font-size: 0.7rem;
  padding: 0 12px;

  &.round-left-top {
    border-top-left-radius: 7px;
  }

  &.round-right-top {
    border-top-right-radius: 7px;
  }
}

@media (max-width: 450px) {
  .v-tab {
    font-size: 0.6rem;
    padding: 0 5px;
  }
}

.step-active {
  background: white;
  color: black !important;
}

.v-tab--disabled {
  opacity: unset;
}

</style>