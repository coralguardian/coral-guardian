<template>
  <div>
    <v-tabs
        fixed-tabs
        v-model="paymentTab"
        active-class="tab-active"
        class="mb-10"
    >
      <v-tab @change="updatePaymentMethod(paymentMethodEnum.creditCard)">
        {{ $t('default.stepper.payment.methods.card.tab') }}
      </v-tab>
      <v-tab @change="updatePaymentMethod(paymentMethodEnum.bankTransfer)">
        {{ $t('default.stepper.payment.methods.bank.tab') }}
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="paymentTab">
      <v-tab-item>
        <stripe-card-data v-if="cardDisplay" ref="cardData" :mode="mode"/>
        <div class="d-flex justify-center" v-else>
          <v-btn
              class="cg-btn"
              color="primary"
              rounded
              @click="cardDisplay = true"
          >
            {{ $t('default.stepper.payment.methods.card.button') }}
          </v-btn>
        </div>

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
    updatePaymentMethod(paymentMethod) {
      let data = {payment_method: paymentMethod}
      this.updateForm(data)
    }
  }
}
</script>

<style scoped>

</style>
