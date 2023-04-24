<template>
  <v-btn
      class="setup-btn"
      height="90"
      color="white"
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

<style lang="scss">

.setup-btn {
  border-radius: 16px;
  text-transform: unset;
  border: 1px solid $secondary !important;
  box-shadow: 0 2px 6px rgba(19, 18, 66, 0.07);
  padding: 12px 26px !important;
  color: $primary !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 20px !important;

  &:hover {
    background: $secondary !important;
  }

  &.v-btn--active {
    border: 2px solid $primary !important;
    background: white;

    &::before {
      background: unset !important;
    }
  }
}

</style>
