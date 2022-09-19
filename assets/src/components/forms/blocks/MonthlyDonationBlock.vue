<template>
  <div id="donationBlock" class="d-flex justify-center align-center">
      <p class="text-left" v-html="$t('default.stepper.payment.donation.description')"/>
      <span class="text-h6">{{ $t('default.stepper.payment.donation.label') }}</span>
      <v-row>
        <v-col cols="7" class="d-flex align-center">
          <v-radio-group
              v-model="selectedPrice"
              row
              dense
          >
            <v-radio
                color="tertiary"
                v-for="price in prices"
                :key="price"
                :label="price + ' €'"
                :value="price"
                @change="updateCustomAmount(price)"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="5">
          <custom-amount
              ref="customAmount"
              :value="donation.price"
              :hint="false"
              @input="updateForm({donation: {price: $event}})"
              inline
          />
        </v-col>
      </v-row>
    <v-row class="justify-space-between" :class="{flexColumn: windowWidth <= 450}">
      <DonationExplanationDialog/>
      <v-btn @click="resetAndNext">
        {{ $t('default.stepper.payment.donation.buttons.through') }}
      </v-btn>
      <v-btn color="secondary">
        {{ $t('default.stepper.payment.donation.buttons.confirm') }}
      </v-btn>
    </v-row>

  </div>
</template>

<script>
import CustomAmount from "@/components/utils/CustomAmount";
import DonationExplanationDialog from "@/components/forms/misc/DonationExplanationDialog";
import {mapActions, mapGetters} from "vuex";
import ValidationMixin from "@/mixins/validationMixin";
import screenMixin from "@/mixins/screenMixin";

export default {
  name: "monthly-donation-block",
  components: {
    CustomAmount,
    DonationExplanationDialog
  },
  mixins: [ValidationMixin, screenMixin],
  data() {
    return {
      prices: [2, 5, 10, 20],
      selectedPrice: null
    }
  },
  computed: {
    ...mapGetters({
      donation: 'getDonation'
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
    updateCustomAmount(amount) {
      this.updateForm({donation: {price: amount}})
    },
    resetAndNext() {
      this.updateForm({donation: {price: 0}}).then(() => this.nextStep())
    },
    nextStep() {
      this.$emit("nextStep")
    }
  },
  mounted() {
    this.$refs.customAmount.setMinInput(2)
  }
}
</script>

<style scoped>

</style>