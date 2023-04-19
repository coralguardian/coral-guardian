<template>
  <v-app>
    <div class="new-form-container">
      <v-form
          ref="firstStepForm"
          :value="firstStepValid"
      >
        <div class="step">
          <donation-step/>
        </div>
        <div class="step last">
          <information-step ref="informationStep"/>
        </div>

        <v-btn
            class="cg-btn d-flex mb-6 mx-auto"
            rounded
            color="primary"
            @click="validFirstStep"
        >
          {{ $t('default.ui.continue') }}
        </v-btn>
      </v-form>

      <div class="step" v-if="displayPaymentStep">
        <payment-step/>
      </div>
    </div>
  </v-app>
</template>

<script>
import PaymentMixin from "./mixins/paymentMixin";
import {mapActions, mapGetters} from "vuex";
import InformationStep from "@/components/forms/steps/InformationStep.vue";
import DonationStep from "@/components/forms/steps/DonationStep.vue";
import PaymentStep from "@/components/forms/steps/PaymentStep.vue";

export default {
  name: "donation-form",
  mixins: [PaymentMixin],
  components: {
    InformationStep,
    DonationStep,
    PaymentStep
  },
  props: {
    type: {
      type: String,
      default: ""
    },
    donatorNature: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      firstStepValid: false,
      displayPaymentStep: false
    }
  },
  computed: {
    ...mapGetters({
      form: 'getForm',
    }),
    informationStep() {
      return this.$refs.informationStep
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    validFirstStep() {
      if (this.$refs.firstStepForm.validate() && this.validInformationStep()) {
        this.displayPaymentStep = true
      }
    },
    validInformationStep() {
      return this.informationStep.$refs[this.informationStep.formRefName].validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.new-form-container {
  padding: 55px;
}

.step {
  padding-bottom: 55px;
}

.step.last {
  padding-bottom: 24px;
}

</style>
