<template>
  <div>
    <div class="donation-select-container">

      <div>
        <p class="cg-title">{{ $t("default.stepper.donation.i_want") }}</p>
        <div id="donation-type-select">
          <v-select
              :items="donationTypes"
              item-text="label"
              item-value="value"
              color="#33A4E4"
              @input="updateForm({donation: {type: $event}})"
              attach="#donation-type-select"
              :rules="[rules.required]"
          />
        </div>
      </div>

      <div>
        <p class="cg-title">{{ $t("default.stepper.donation.amount") }}</p>
        <div id="donation-price-select">
          <v-select
              :items="donationAmounts"
              item-text="label"
              item-value="value"
              color="#33A4E4"
              @input="updateAmountFromSelect"
              attach="#donation-price-select"
              :rules="[rules.required]"
          />
        </div>
      </div>

      <custom-amount
          class="custom-amount-input"
          v-if="displayCustomAmount"
          :value="donation.price"
          :hint="false"
          :min-amount="0"
          @input="updateForm({donation: {price: $event}})"
          placeholder="default.stepper.adoption.customAmount.label"
          :label="null"
          :rules="[rules.required, rules.minValue]"
      />

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import validationMixin from "../../../mixins/validationMixin";
import screenMixin from "@/mixins/screenMixin";
import DonationEnum from "@/enums/donationEnum";
import CustomAmount from "@/components/utils/CustomAmount.vue";

export default {
  name: "donation-step",
  components: {CustomAmount},
  mixins: [itemTranslationMixin, validationMixin, screenMixin],
  data() {
    return {
      displayCustomAmount: false
    }
  },
  computed: {
    ...mapGetters({
      donation: "getDonation"
    }),
    donationTypes() {
      return [
        {
          label: this.$t('default.stepper.donation.select_duration.recurrent'),
          value: DonationEnum.monthly
        },
        {
          label: this.$t('default.stepper.donation.select_duration.unique'),
          value: DonationEnum.oneshot
        }
      ]
    },
    donationAmounts() {
      return [
        {
          label: '5€',
          value: 5
        },
        {
          label: '10€',
          value: 10
        },
        {
          label: '15€',
          value: 15
        },
        {
          label: '20€',
          value: 20
        },
        {
          label: this.$t('default.stepper.donation.other_amount'),
          value: null
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
    updateAmountFromSelect(amount) {
      this.updateForm({donation: {price: amount}})
      if (amount === null) {
        this.displayCustomAmount = true
      } else {
        this.displayCustomAmount = false
      }
    }
  }
}
</script>

<style lang="scss">
.donation-select-container {
  width: 80%;
  margin: auto;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cg-title {
    margin-bottom: unset;
    margin-right: 12px;
  }

  .custom-amount-input {
    width: 250px;
    margin: auto;
  }
}

#donation-type-select, #donation-price-select {
  position: relative;

  .v-select__selection {
    font-size: 24px !important;
    color: #33A4E4 !important;
    font-weight: 700 !important;
  }
}

#donation-type-select {
  width: 220px;
}

#donation-price-select {
  width: 80px;
}
</style>
