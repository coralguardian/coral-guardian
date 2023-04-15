<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.finalAdoption.hint", {count: order.quantity, item: order.productType}) }}
    </template>

    <p
        v-if="adoption.type === 'file'"
        v-html="$tc('default.stepper.finalAdoption.description_file', order.quantity, translation)"
    />

    <p
        v-else-if="hasDownloaded"
        v-html="$tc('default.stepper.finalAdoption.description_no_certif', order.quantity)"
    />

    <div v-else>
      <p class="cg-base-text light">{{ $tc('default.stepper.certificate.adoption.email', order.quantity) }}</p>
      <a
          class="cg-btn download-certificate-button"
          target="_blank"
          :href="this.getGetUrl({order_uuid: order.uuid})"
      >
        {{ $t("default.stepper.finalAdoption.download") }}
      </a>
    </div>

  </final-step>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import paymentMixin from "../../../mixins/paymentMixin";
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "final-adoption-step",
  components: {
    FinalStep
  },
  mixins: [apiMixin, finalStepMixin, itemTranslationMixin, paymentMixin],
  computed: {
    ...mapGetters({
      hasDownloaded: "hasDownloaded",
      adoption: "getAdoption"
    })
  }
}
</script>

<style scoped lang="scss">
.cg-base-text.light {
  line-height: 25px;
}

.download-certificate-button {
  margin-top: 32px;
  margin-bottom: 32px;
}

</style>
