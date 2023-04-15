<template>
  <div id="donationBlock">
    <v-radio-group
        class="donation-button-container"
        v-model="selectedPrice"
    >
      <div
          v-for="(price, index) in prices"
          :key="price"
          class="col-6 donation-button"
          :class="{left: index%2 === 0}"
      >
        <setup-btn
            :value="isSelectedPrice(price)"
            @click="updateCustomAmount(price)"
        >
            <v-radio
                :value="price"
                class="mr-3"
            />
          {{ price }} €

        </setup-btn>
      </div>
    </v-radio-group>

    <custom-amount
        ref="customAmount"
        :value="donation.price"
        :hint="false"
        :min-amount="min"
        @input="updateFromCustomAmount($event)"
    />

    <deduction :donation="donation.price"/>
  </div>
</template>

<script>
import Deduction from "@/components/utils/Deduction";
import CustomAmount from "@/components/utils/CustomAmount";
import {mapActions, mapGetters} from "vuex";
import ValidationMixin from "@/mixins/validationMixin";
import SetupBtn from "@/components/forms/full/SetupBtn.vue";

export default {
  name: "donation-block",
  components: {
    SetupBtn,
    Deduction,
    CustomAmount,
  },
  mixins: [ValidationMixin],
  props: {
    final: {
      type: Boolean,
      default: false
    },
    prices: {
      type: Array,
      default: () => [5, 10, 20, 50]
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedPrice: null
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'getCurrentStep',
      donation: 'getDonation'
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
    updateCustomAmount(amount) {
      this.selectedPrice = amount
      this.updateForm({donation: {price: amount}})
    },
    updateFromCustomAmount(amount) {
      this.selectedPrice = null
      this.updateForm({donation: {price: amount}})
    },
    isSelectedPrice(price) {
      return this.selectedPrice === price
    }
  }
}
</script>

<style lang="scss">
.donation-button-container {
  .v-input--radio-group__input {
    flex-wrap: wrap !important;
    flex-direction: unset !important;
  }

  .donation-button {
    text-align: left;

    button {
      width: 100%;
    }

    &.left {
      padding-left: unset;
    }

    &:not(.left) {
      padding-right: unset;
    }

    .v-btn__content {
      justify-content: flex-start !important;
    }
  }
}
</style>
