<template>
  <div class="d-flex justify-space-between">
    <v-btn
        large
        color="secondary"
        class="black--text text-no-transform"
        @click="openForm"
    >
      {{ text }}
      <tooltip
          v-if="!$vuetify.breakpoint.xs"
          @showTooltip="$emit('showTooltip', tooltip)"
          @hideTooltip="$emit('hideTooltip')"
      />
    </v-btn>

    <tooltip
        class="ml-2"
        v-if="$vuetify.breakpoint.xs"
        @showTooltip="$emit('showTooltip', tooltip)"
        @hideTooltip="$emit('hideTooltip')"
    />
  </div>

</template>

<script>
import Tooltip from "@/components/utils/Tooltip";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "ChoiceBtn",
  components: {
    Tooltip
  },
  mixins: [itemTranslationMixin],
  props: {
    text: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    }
  },
  methods: {
    openForm() {
      this.$emit('openForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-position {
  top: 10px !important;
  left: 60px !important;
}

div > button {
  flex: 1 0 auto;
}
</style>