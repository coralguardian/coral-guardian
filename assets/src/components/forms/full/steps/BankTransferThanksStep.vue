<template>
  <final-step>

    <template v-slot:hint>
      {{ $t("default.stepper.bankTransferThanks.hint") }}
    </template>

    <p class="cg-base-text light">
      {{$t('default.stepper.bankTransferThanks.description')}}
    </p>

    <p class="cg-base-text light">
      {{$t('default.stepper.bankTransferThanks.seeYouSoon')}}
    </p>
  </final-step>

</template>

<script>
import FinalStep from "@/components/forms/misc/FinalStep.vue";

export default {
  name: "bank-transfer-thanks-step",
  components: {FinalStep}
}
</script>

<style scoped>

</style>
