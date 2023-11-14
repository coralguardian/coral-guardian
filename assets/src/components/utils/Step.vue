<template>
  <div :id="id" class="form-step cbo-smoothscroll mt-3">

    <text-breadcrumb v-if="step.displayBreadcrumb"/>

    <h3 class="cg-title text-center" v-if="step.title">
      <span v-if="isSpecific" v-html="$tc(step.title, count, specific)"/>
      <span v-else-if="isSingular" v-html="$tc(step.title, count, singular)"/>
      <span v-else v-html="$tc(step.title, count, translation)"/>
    </h3>

    <slot></slot>

  </div>
</template>

<script>
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import TextBreadcrumb from "@/components/forms/misc/TextBreadcrumb.vue";
import Step from "@/forms/Step";

export default {
  name: "step",
  components: {TextBreadcrumb},
  mixins: [itemTranslationMixin],
  props: {
    id: {
      type: String,
      default: ""
    },
    isSingular: {
      type: Boolean,
      default: false
    },
    isSpecific: {
      type: Boolean,
      default: false
    },
    step: {
      type: Step,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.form-step {
  padding: 1rem 2rem 0;
  //border-radius: $base-border-radius;
}
//
//.choice-step {
//  padding: 2rem 2rem 1rem;
//}
//
//.form-step:not(.choice-step) {
//  height: calc(#{$form-height} - 116px); // height of header and height of footer 48 + 68
//  overflow: auto;
//}
</style>
