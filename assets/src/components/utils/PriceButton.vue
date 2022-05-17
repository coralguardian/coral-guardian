<template>
  <v-btn depressed color="primary" class="tertiary--text" @click="$emit('click')">
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  name: "price-button",
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn.v-size--default {
  padding: unset;
  margin: 1em 0.5em;
}
</style>