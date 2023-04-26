<template>
  <v-app v-if="displayForm">
    <div class="new-form-container" v-if="displayFinalStep === false">
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
      </v-form>

      <div class="step" v-if="displayPaymentStep">
        <payment-step
            ref="paymentStep"
            mode="donation"
            :bank-transfer="false"
        />
      </div>

      <v-btn
          class="cg-btn d-flex mb-6 mx-auto"
          rounded
          color="primary"
          @click="validStep"
          :loading="isLoading"
      >
        {{ $t('default.ui.pay') }}
      </v-btn>
    </div>

    <div class="new-form-container" v-else>
      <final-donation-step/>
    </div>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import InformationStep from "@/components/forms/steps/InformationStep.vue";
import DonationStep from "@/components/forms/steps/DonationStep.vue";
import PaymentStep from "@/components/forms/steps/PaymentStep.vue";
import FinalDonationStep from "@/components/forms/steps/FinalDonationStep.vue";
import GtagService from "@/services/gtagService";
import paymentCheckMixin from "@/mixins/paymentCheckMixin";
import fillStateMixin from "@/mixins/fillStateMixin";
import PaymentStatusEnum from "@/enums/paymentStatusEnum";

export default {
  name: "donation-form",
  components: {
    InformationStep,
    DonationStep,
    PaymentStep,
    FinalDonationStep
  },
  mixins: [paymentCheckMixin, fillStateMixin],
  props: {},
  data() {
    return {
      displayForm: false,
      firstStepValid: false,
      displayPaymentStep: false,
      isLoading: false,
      displayFinalStep: false,
      mode: "donation"
    }
  },
  computed: {
    ...mapGetters({
      donation: "getDonation",
      adopter: "getAdopter"
    }),
    informationStep() {
      return this.$refs.informationStep
    }
  },
  methods: {
    validStep() {
      if (this.displayPaymentStep === false) {
        this.validateFirstStep()
      } else {
        this.purchase()
      }
    },
    validateFirstStep() {
      if (this.$refs.firstStepForm.validate() && this.validInformationStep()) {
        this.displayPaymentStep = true
        setTimeout(() => {
          this.$vuetify.goTo('#paymentStep', {offset: 200})
        }, 200)
      } else {
        setTimeout(() => {
          this.$vuetify.goTo('#donationStep', {offset: 200})
        }, 200)
      }
    },
    validInformationStep() {
      return this.informationStep.$refs[this.informationStep.formRefName].validate()
    },
    purchase() {
      this.isLoading = true
      this.$refs.paymentStep.purchase()
    },
    displayFinalStepAction() {
      this.displayFinalStep = true
      setTimeout(() => {
        this.displayForm = true
      }, 200)
      setTimeout(() => {
        this.$vuetify.goTo('#finalDonationStep', {offset: 400})
      }, 200)
    },
    checkForPayment() {
      this.checkForPaymentIntent()
        .then((status) => {
          if (status === PaymentStatusEnum.succeeded) {
            (new GtagService()).executeTag(this.donation, 'donation', this.adopter);
            this.displayFinalStepAction()
          } else if (status === PaymentStatusEnum.error) {
            this.displayPaymentStep = true
            this.displayForm = true
          } else {
            this.startForm()
          }
        })
        .catch(() => {
          this.startForm()
        })
    },
    startForm() {
      this.fillState()
        .then(() => {
          this.displayForm = true
        })
    }
  },
  mounted() {
    this.checkForPayment()
    this.$root.$on('IsLoaded', () => this.isLoading = false)
  },
  beforeDestroy() {
    this.$root.$off('IsLoaded')
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
