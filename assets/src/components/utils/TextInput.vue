<template>
  <div>
    <p
        v-if="label"
        class="text-left subtitles"
    >
      {{label}}
    </p>
    <v-text-field
        dense
        color="tertiary"
        outlined
        :placeholder="placeholder"
        :rules="rules"
        :value="value"
        @input="$emit('input', $event)"
    />
  </div>

</template>

<script>
export default {
  name: "text-input",
  props: {
    value: null,
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: ""
    },
    rules: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>

</style>