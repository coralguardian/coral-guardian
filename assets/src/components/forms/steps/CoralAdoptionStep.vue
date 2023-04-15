<template>
  <div>
    <hint class="mb-10">
      <p
          class="cg-base-text"
          v-html="description"
      />
    </hint>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <adoption-count-block/>
    </v-form>
  </div>
</template>

<script>
import AdoptionStep from "@/components/forms/steps/AdoptionStep";

export default {
  name: "coral-adoption-step",
  extends: AdoptionStep
}
</script>

<style lang="scss" scoped>
</style>
