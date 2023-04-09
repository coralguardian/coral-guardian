<template>
  <v-tooltip
      class="btn-tooltip"
      color="primary"
      max-width="350"
      :attach="attach"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
          class="setup-tooltip-icon"
          color="primary"
          v-bind="attrs"
          v-on="on"
          small
      >
        mdi-information
      </v-icon>
    </template>
    <div class="tooltip-container">
      <slot></slot>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  name: "btn-tooltip",
  props: {
    attach: {
      type: String,
      default: "#full-form"
    }
  },
  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss" scoped>
.setup-tooltip-icon {
  color: $primary;
  margin-left: 16px;
  font-size: 20px !important;
}

.tooltip-container {
  color: white;
  line-height: 24px;
  font-size: 16px;
  padding: 10px;
}
</style>
