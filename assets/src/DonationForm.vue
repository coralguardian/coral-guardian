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
        {{ $t('default.ui.continue') }}
      </v-btn>
    </div>

    <div class="new-form-container" v-else>
      <final-donation-step/>
    </div>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InformationStep from "@/components/forms/steps/InformationStep.vue";
import DonationStep from "@/components/forms/steps/DonationStep.vue";
import PaymentStep from "@/components/forms/steps/PaymentStep.vue";
import FinalDonationStep from "@/components/forms/steps/FinalDonationStep.vue";
import AdopterEnum from "@/enums/adopterEnum";
import GtagService from "@/services/gtagService";

export default {
  name: "donation-form",
  components: {
    InformationStep,
    DonationStep,
    PaymentStep,
    FinalDonationStep
  },
  mixins: [],
  props: {
  },
  data() {
    return {
      displayForm: false,
      firstStepValid: false,
      displayPaymentStep: false,
      params: {},
      isLoading: false,
      displayFinalStep: false,
      paymentSucceeded: false
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
    ...mapActions({
      updateForm: "updateForm",
      forceUpdate: "forceUpdate"
    }),
    fillParams() {
      new URLSearchParams(window.location.search)
        .forEach((value, key) => {
          this.params[key] = value
        })
    },
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
      }
    },
    validInformationStep() {
      return this.informationStep.$refs[this.informationStep.formRefName].validate()
    },
    purchase() {
      this.isLoading = true
      this.$refs.paymentStep.purchase()
    },
    checkForPaymentIntent() {
      return new Promise((resolve, reject) => {
        if (this.params.setup_intent_client_secret) {
          let data = localStorage.getItem(this.params.setup_intent_client_secret);
          if (data) {
            data = JSON.parse(data)
            this.forceUpdate(data).then(() => {
              this.checkPaymentStatus().then(() => resolve())
            })
          } else {
            reject()
          }
        } else {
          resolve()
        }
      })
    },
    async checkPaymentStatus() {
      this.createStripe()
      const {setupIntent} = await this.stripe.retrieveSetupIntent(this.params.setup_intent_client_secret);
      this.updateForm({order: {clientSecret: setupIntent.client_secret, stripePaymentIntentId: setupIntent.id}})
      switch (setupIntent.status) {
        case "succeeded":
          (new GtagService()).executeTag(this.donation, 'donation', this.adopter);
          this.paymentSucceeded = true
          break
        case "processing":
        case "requires_payment_method":
        default:
          this.displayPaymentStep = true
      }
    },
    displayFinalStepAction() {
      this.displayFinalStep = true
      setTimeout(() => {
        this.displayForm = true
      }, 200)
      setTimeout(() => {
        this.$vuetify.goTo('#finalDonationStep', {offset: 400})
      }, 200)
    }
  },
  created() {
    this.fillParams()
    let data = {adopter: {type: AdopterEnum.individual}}
    if (this.params.c && AdopterEnum.isValueValid(this.params.c)) {
      data = {adopter: {type: this.params.c}}
    }
    this.updateForm(data)
  },
  mounted() {
    this.checkForPaymentIntent()
      .then(() => {
        if (this.paymentSucceeded) {
          this.displayFinalStepAction()
        } else {
          this.displayForm = true
        }
      }).catch(() => {
      this.displayForm = true
    })
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
