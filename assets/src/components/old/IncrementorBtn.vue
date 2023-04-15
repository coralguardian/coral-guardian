<template>
  <v-btn
      :class="{big: big}"
      :disabled="(!increment && count <= 1) || (increment && max && count >= max)"
      fab
      rounded
      outlined
      elevation="0"
      @click="increment ? incrementCount() : decrementCount()"
  >
    <v-icon
        color="black"
    >
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "incrementor-btn",
  props: {
    increment: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      required: true
    },
    count: {
      type: Number
    },
    max: {
      type: Number
    },
    big: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      incrementCount: "incrementCount",
      decrementCount: "decrementCount"
    })
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  border: 2px solid $primary;

  &.big  {
    width: $incrementor-size / 1.3 !important;
    height: $incrementor-size / 1.3 !important;
  }

  &:not(.big) {
    width: $incrementor-size / 2 !important;
    height: $incrementor-size / 2 !important;
  }

}
</style>