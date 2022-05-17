<template>
  <v-btn
      height="60"
      :color="value ? 'tertiary' : 'primary'"
      v-model="value"
      @click="$emit('click')"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "setup-btn",
  props: {
    value: null
  }
}
</script>

<style scoped>

</style>