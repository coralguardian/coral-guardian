<template>
  <div>
    <v-tabs
        fixed-tabs
        background-color="primary"
        class="black--text"
        v-model="paymentTab"
        active-class="tertiary-tab-active"
    >
      <v-tab @change="updateForm(getData(paymentMethodEnum.creditCard))">
        {{ $t('default.stepper.payment.methods.card.tab') }}
      </v-tab>
      <v-tab @change="updateForm(getData(paymentMethodEnum.bankTransfer))">
        {{ $t('default.stepper.payment.methods.bank.tab') }}
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="paymentTab">
      <v-tab-item>
        <stripe-card-data v-if="cardDisplay" ref="cardData" :mode="mode"/>
        <v-btn
            v-else
            color="secondary"
            class="black--text mt-5"
            @click="cardDisplay = true"
        >
          {{ $t('default.stepper.payment.methods.card.button') }}
        </v-btn>
      </v-tab-item>
      <v-tab-item>
        <bank-transfer-block/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import StripeCardData from "../../utils/StripeCardData";
import BankTransferBlock from "./BankTransferBlock";
import {mapActions} from "vuex";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

export default {
  name: "payment-method-block",
  components: {
    StripeCardData,
    BankTransferBlock
  },
  data() {
    return {
      paymentTab: null,
      cardDisplay: false
    }
  },
  props: {
    mode: {
      type: String,
      default: "adoption"
    }
  },
  computed: {
    paymentMethodEnum() {
      return PaymentMethodEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    getData(paymentMethod) {
      return this.mode === "adoption" ?
          {order: {payment_method: {type: paymentMethod}}} :
          {donation: {payment_method: {type: paymentMethod}}}
    }
  }
}
</script>

<style scoped>

</style>