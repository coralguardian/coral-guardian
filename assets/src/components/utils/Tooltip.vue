<template>
  <v-icon
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
  >
    mdi-information-outline
  </v-icon>
</template>

<script>
export default {
  name: "tooltip",
  methods: {
    showTooltip() {
      this.$emit('showTooltip')
    },
    hideTooltip() {
      this.$emit('hideTooltip')
    }
  }
}
</script>

<style scoped>

</style>