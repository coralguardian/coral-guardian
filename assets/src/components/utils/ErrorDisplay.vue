<template>
  <p v-if="message" class="cg-base-text error--text">
    {{ message }}
  </p>
</template>

<script>
export default {
  name: "error-display",
  props: {
    message: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
