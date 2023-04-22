<template>
  <div id="paymentStep">

    <div v-if="cardDisplay">
      <hint type="danger">
        <p class="cg-base-text" v-html="$t('default.stepper.payment.important')"/>
      </hint>
      <stripe-card-data
          :mode="mode"
          ref="cardData"
          @reCaptchaValid="isValidRecaptcha = true"
          @reCaptchaNotValid="isValidRecaptcha = true"
      />
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

  </div>
</template>

<script>
import StripeCardData from "@/components/utils/StripeCardData";
import PaymentMethodBlock from "../blocks/PaymentMethodBlock";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import validationMixin from "@/mixins/validationMixin";
import {mapActions, mapGetters, mapState} from "vuex";
import apiMixin from "@/mixins/apiMixin";
import GtagService from "@/services/gtagService";
import AdopterEnum from "@/enums/adopterEnum";
import DonationEnum from "@/enums/donationEnum";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";
import Hint from "@/components/utils/Hint.vue";
import stripeMixin from "@/mixins/stripeMixin";

export default {
  name: "payment-step",
  components: {
    Hint,
    StripeCardData,
    PaymentMethodBlock,
  },
  mixins: [itemTranslationMixin, validationMixin, stripeMixin, apiMixin],
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
      step: 1,
      displayPaymentMethod: false,
      cardDisplay: false,
      message: {
        text: "",
        type: "success",
        class: "green--text"
      },
      adoptionCheckingInterval: null,
      adoptionCheckingTimeout: null,
      isValidRecaptcha: false
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      donation: "getDonation",
      adopter: "getAdopter",
      project: "getProject",
      orderModel: "getOrderModel",
      paymentMethod: "getPaymentMethod"
    }),
    ...mapState({
      baseElementPrice: state => state.data.baseElementPrice,
    }),
    element() {
      return this.mode === "adoption" ? this.order : this.donation
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
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
      const {setupIntent} = await this.stripe.retrieveSetupIntent(clientSecret);
      this.updateForm({order: {clientSecret: setupIntent.client_secret, stripePaymentIntentId: setupIntent.id}})
      let displayCardForm = false;
      switch (setupIntent.status) {
        case "succeeded":
          (new GtagService()).executeTag(this.element, this.mode, this.adopter);
          this.message = {
            text: "stripe.payment.success",
            type: "success",
            class: "green--text"
          }
          this.$root.$emit("hidePreviousButton")
          this.updateElementStatus("success")
          this.$emit('succeeded')
          this.$root.$off(this.customValidationEventName)
          this.$root.$on(this.customValidationEventName, () => {
            if (this.mode === "donation") {
              this.$root.$emit("ApiValid")
            } else {
              this.checkForAdoptionTimeout()
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
      if (this.paymentMethod === PaymentMethodEnum.bankTransfer) {
        this.$root.$emit('StepValid')
        // cas du paiement par carte
      } else {
        // on check reCAPTCHA
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
      if (this.paymentMethod === PaymentMethodEnum.bankTransfer) {
        let data;
        data = this.$store.getters.getOrderModel
        this[this.apiData.method](data, this.apiData.endpoint)
            .then((resp) => {
              if (resp.data) {
                const data = this.mode === "adoption" ? {order: resp.data} : {donation: resp.data}
                this.updateForm(data).then(() => {
                  this.$root.$emit('ApiValid')
                })
              } else {
                this.$root.$emit('ApiValid')
              }
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
    },
    checkForAdoptionTimeout() {
      this.adoptionCheckingInterval = setInterval(() => {
        this.checkForAdoptionUuid()
      }, 1000)
      this.adoptionCheckingTimeout = setTimeout(() => {
        clearInterval(this.adoptionCheckingInterval)
        this.$root.$emit("displayError", 'adoption_not_found')
      }, 10000)

    },
    checkForAdoptionUuid() {
      this.getByUrl(this.getGetUrlNoApiData({stripePaymentIntentId: this.order.stripePaymentIntentId}, "adoption/uuid"))
          .then((resp) => {
            clearInterval(this.adoptionCheckingInterval)
            clearTimeout(this.adoptionCheckingTimeout)
            this.updateForm({order: {uuid: resp.data.uuid}}).then(() => {
              this.$root.$emit("ApiValid")
            })
          })
    }
  },
  mounted() {
    if (this.adopter.type === AdopterEnum.company &&
        !this.element.clientSecret &&
        // this.element.type !== DonationEnum.monthly &&
        (!this.orderModel.donationOrdered.length || this.orderModel.donationOrdered[0].donationRecurrency !== DonationEnum.monthly)) // si on fait un don mensuel on ne peut pas payer par virement
    {
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
