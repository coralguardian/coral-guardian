<template>
  <v-card elevation="0" :id="id" class="text-center form-step cbo-smoothscroll">

    <p class="text-uppercase pb-5 text-h6 font-weight-bold poppins-police">
      <span v-if="isSpecific">
        {{$tc(title, count, specific)}}
      </span>
      <span v-else-if="isSingular">
        {{$tc(title, count, singular)}}
      </span>
      <span v-else>
        {{$tc(title, count, translation)}}
      </span>
    </p>

    <slot></slot>

  </v-card>
</template>

<script>
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "step",
  mixins: [itemTranslationMixin],
  props: {
    id: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true
    },
    isSingular: {
      type: Boolean,
      default: false
    },
    isSpecific: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-step {
  padding: 1rem 2rem;
  border-radius: $base-border-radius;
}

.choice-step {
  padding: 2rem 2rem 1rem;
}

.form-step:not(.choice-step) {
  height: calc(#{$form-height} - 116px); // height of header and height of footer 48 + 68
  overflow: auto;
}
</style>