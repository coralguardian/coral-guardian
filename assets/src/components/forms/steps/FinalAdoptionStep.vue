<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.finalAdoption.hint", {count: order.quantity, item: order.productType}) }}
    </template>

    <p
        v-if="adoption.type !== 'fields'"
        class="cg-base-text light"
        v-html="$tc('default.stepper.finalAdoption.description_not_named', order.quantity, translation)"
    />

    <div v-else>
      <p class="cg-base-text light">{{ $tc('default.stepper.certificate.adoption.email', order.quantity) }}</p>

      <div v-if="order.quantity <= 3">
        <p class="cg-base-text light">{{ $tc('default.stepper.finalAdoption.download_description', order.quantity) }}</p>
        <a
            class="cg-btn download-certificate-button"
            target="_blank"
            :href="this.getGetUrl({order_uuid: order.uuid})"
        >
          {{ $tc("default.stepper.finalAdoption.download", order.quantity) }}
        </a>
      </div>

    </div>

  </final-step>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters} from "vuex";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "final-adoption-step",
  components: {
    FinalStep
  },
  mixins: [apiMixin, finalStepMixin, itemTranslationMixin],
  computed: {
    ...mapGetters({
      adoption: "getAdoption",
      order: "getOrder"
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
