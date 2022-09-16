<template>
  <div>

    <div v-if="cardDisplay">
      <p>{{ $t("default.stepper.payment.description") }}</p>
      <stripe-card-data :mode="mode" ref="cardData"/>
    </div>

    <v-alert
        v-else-if="message.text !== ''"
        dense
        text
        :type="message.type"
        :class="message.class"
    >
      {{ $t("default." + message.text) }}
    </v-alert>

    <payment-method-block v-if="displayPaymentMethod" ref="paymentMethod" :mode="mode"/>

    <div class="text-left">
      <p class="mt-4 mb-4 text-h6 font-weight-bold poppins-police">
        {{ $t('default.stepper.payment.reminder.title') }}
      </p>

      <v-card
          outlined
      >
        <div>
          <span class="text-body-1">{{ paymentDescription }}</span>
        </div>

        <div class="paymentDetail text-body-1">
          {{ paymentReminder }}
        </div>
      </v-card>
    </div>

  </div>
</template>

<script>
import StripeCardData from "@/components/utils/StripeCardData";
import PaymentMethodBlock from "../blocks/PaymentMethodBlock";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import validationMixin from "../../../mixins/validationMixin";
import paymentMixin from "../../../mixins/paymentMixin";
import {mapActions, mapGetters, mapState} from "vuex";
import apiMixin from "../../../mixins/apiMixin";
import GtagService from "../../../services/gtagService";
import AdopterEnum from "@/enums/adopterEnum";
import DonationEnum from "@/enums/donationEnum";

export default {
  name: "payment-step",
  components: {
    StripeCardData,
    PaymentMethodBlock
  },
  mixins: [itemTranslationMixin, validationMixin, paymentMixin, apiMixin],
  props: {
    mode: {
      type: String,
      default: 'adoption'
    },
    bankTransfer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      displayPaymentMethod: false,
      cardDisplay: false,
      message: {
        text: "",
        type: "success",
        class: "green--text"
      }
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      donation: "getDonation",
      formType: "getFormType",
      adopter: "getAdopter",
      project: "getProject"
    }),
    ...mapState({
      baseElementPrice: state => state.data.baseElementPrice,
    }),
    element() {
      return this.mode === "adoption" ? this.order : this.donation
    },
    paymentReminder() {
      let reminder = "";
      if (this.mode === 'adoption') {
        if (this.order.customAmount) {
          reminder = this.$t("default.stepper.adoption.customAmount.label") + " " + this.order.price
        } else {
          reminder = this.order.quantity + " * " + this.baseElementPrice + " = " + this.order.price
        }
      } else {
        reminder = this.$t("default.stepper.adoption.customAmount.label") + " " + this.donation.price
      }
      return reminder + ' €'
    },
    paymentDescription() {
      let description = ''
      if (this.mode === 'adoption') {
        description = this.$tc('default.stepper.payment.reminder.adoption.description.' + this.project, this.order.quantity, {
          count: this.order.quantity,
          item: this.specificTranslation ? this.specific.item : this.translation.item
        })
      } else {
        description = this.$t('default.stepper.payment.reminder.donation.description.' + this.project, {
          item: this.$t('default.' + this.donation.type)
        })
      }
      return description
    },
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      loadPaymentNextSteps: "loadPaymentNextSteps",
      loadForm: "loadForm"
    }),
    displayCard() {
      if (this.element.status === "pending") {
        return this.checkPaymentStatus()
      } else {
        this.cardDisplay = true;
      }
    },
    async checkPaymentStatus() {
      this.createStripe()
      const clientSecret = this.element.clientSecret
      const {paymentIntent} = await this.stripe.retrievePaymentIntent(clientSecret);
      let displayCardForm = false;
      switch (paymentIntent.status) {
        case "succeeded":
          this.message = {
            text: "stripe.payment.success",
            type: "success",
            class: "green--text"
          }
          this.$root.$emit("hidePreviousButton")
          this.updateElementStatus("success")
          this.$root.$off(this.customValidationEventName)
          this.$root.$on(this.customValidationEventName, () => {
            if (this.element.type !== DonationEnum.monthly && this.formType === "advanced") {
              this.loadPaymentNextSteps().then(() => this.$root.$emit("ApiValid"))
            } // cas du don suite à une adoption, on a plus d'étape à charger
            else {
              this.$root.$emit("ApiValid")
            }
          })
          break
        case "processing":
          this.message = {
            text: "stripe.payment.processing",
            type: "warning",
            class: "orange--text"
          }
          //@todo: que faire dans ce cas ??
          break
        case "requires_payment_method":
          this.message = {
            text: "stripe.payment.refused",
            type: "error",
            class: "red--text"
          }
          displayCardForm = true
          break
        default:
          this.message = {
            text: "stripe.payment.error",
            type: "error",
            class: "red--text"
          }
          displayCardForm = true
      }

      if (displayCardForm) {
        this.$root.$on(this.customValidationEventName, () => {
          this.$root.$emit(this.validationErrorEventName)
          this.$root.$emit('IsLoaded')
        })
      }
      return displayCardForm
    },
    validation() {
      this.message = {text: ""}
      // cas du paiement par virement
      // il n'y a rien de particulier à vérifier
      if (this.element.payment_method.type === "bank_transfert") {
        this.$root.$emit('StepValid')
        // cas du paiement par carte
      } else {
        // si le virement est actif alors on vérifie les infos de la carte dans le composant PaymentMethod
        if (this.displayPaymentMethod) {
          if (!this.$refs.paymentMethod.cardDisplay) {
            this.$root.$emit('IsLoaded')
            this.message = {
              text: "stepper.payment.errors.card",
              type: "error",
              class: "red--text"
            }
          } else {
            this.$refs.paymentMethod.$refs.cardData.validateCard()
          }
          // si le virement n'est pas actif on vérifie les informations dans le composant StripeCard
        } else if (!this.cardDisplay) {
          this.$root.$emit('IsLoaded')
          this.message = {
            text: "stepper.payment.errors.card",
            type: "error",
            class: "red--text"
          }
        } else {
          this.$refs.cardData.validateCard()
        }
      }
    },
    purchase() {
      this.updateElementStatus("pending")
      // cas du paiement par virement
      if (this.element.payment_method.type === "bank_transfert") {
        let data;
        if (this.mode === 'adoption') {
          data = this.$store.getters.getOrderModel
        } else {
          data = this.$store.getters.getPostPaymentDataDonation
        }
        this[this.apiData.method](data, this.apiData.endpoint)
            .then((resp) => {
              const data = this.mode === "adoption" ? {order: resp.data} : {donation: resp.data}
              this.updateForm(data).then(() => {
                this.loadPaymentNextSteps().then(() => this.$root.$emit('ApiValid'))
              })
            })
            .catch(() => {
              console.log("erreur")
            })
        // cas du paiement par carte
      } else {
        if (this.displayPaymentMethod) {
          this.$refs.paymentMethod.$refs.cardData.purchase()
        } else {
          this.$refs.cardData.purchase()
        }
      }
    },
    updateElementStatus(status) {
      let data = this.mode === "adoption" ? {order: {status: status}} : {donation: {status: status}}
      this.updateForm(data)
    }
  },
  mounted() {
    (new GtagService()).executeTag(this.element, this.mode);
    if (this.adopter.type === AdopterEnum.company && !this.element.clientSecret && this.element.type !== DonationEnum.monthly) {
      this.displayPaymentMethod = true
    } else {
      this.displayCard()
    }
    this.$root.$on(this.customValidationEventName, this.validation)
    this.$root.$on(this.apiEventName, this.purchase)
  },
  beforeDestroy() {
    this.$root.$off(this.customValidationEventName)
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style lang="scss" scoped>

.v-card {
  > div {
    padding: 0.6rem;
  }
}

.paymentDetail {
  background: $primary;
  text-align: right;
  font-weight: 900;
}
</style>