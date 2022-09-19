<template>
  <div>
    <p class="text-left text-body-1" v-html='$t("default.stepper.payment.donation.description")'/>

    <donation-block
        class="mt-3"
        :min="2"
        :prices="[2, 5, 10, 20]"
    />

    <donation-explanation-dialog/>

  </div>
</template>

<script>
import DonationBlock from "@/components/forms/blocks/DonationBlock";
import DonationExplanationDialog from "@/components/forms/misc/DonationExplanationDialog";
import {mapActions, mapGetters} from "vuex";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import screenMixin from "@/mixins/screenMixin";

export default {
  name: "pre-payment-donation-step",
  components: {
    DonationBlock,
    DonationExplanationDialog
  },
  mixins: [itemTranslationMixin, screenMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      donation: "getDonation"
    })
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    }),
  },
  mounted() {
    this.$root.$on("ignoreStep", () => {
      this.updateForm({donation: {price: 0}})
          .then(() => {
            this.$root.$emit("StepValid")
          })
    })
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  padding: 2rem 0;
}
</style>