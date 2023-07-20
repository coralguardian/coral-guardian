<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.finalAdoption.hint", {...{count: order.quantity}, ...translation}) }}
    </template>

    <p class="cg-base-text light">{{ $tc('default.stepper.finalDeposit.adoption.description', order.quantity) }}</p>

    <div v-if="order.quantity <= 3">
      <p class="cg-base-text light">{{ $tc('default.stepper.finalDeposit.adoption.download', order.quantity) }}</p>
      <a
          class="cg-btn download-certificate-button"
          target="_blank"
          :href="this.getGetUrl({order_uuid: order.uuid})"
      >
        {{ $tc("default.stepper.finalAdoption.download", order.quantity) }}
      </a>
    </div>

  </final-step>
</template>

<script>
import apiMixin from "@/mixins/apiMixin";
import finalStepMixin from "@/mixins/finalStepMixin";
import {mapGetters, mapState} from "vuex";
import FinalStep from "@/components/forms/misc/FinalStep.vue";
import FormTypeEnum from "@/enums/formTypeEnum";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "final-adoption-deposit-step",
  components: {
    FinalStep
  },
  mixins: [apiMixin, finalStepMixin, itemTranslationMixin],
  computed: {
    ...mapGetters({
      adoption: "getAdoption",
      order: "getOrder"
    }),
    ...mapState({
      formType: "formType"
    }),
    formTypeEnum() {
      return FormTypeEnum
    }
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
