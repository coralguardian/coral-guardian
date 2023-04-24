<template>
  <div class="hint" :class="typeClass">
    <v-icon
        v-if="icon"
        class="hint-icon"
        color="primary"
    >
      {{icon}}
    </v-icon>
    <v-icon
        v-else-if="type === 'primary'"
        class="hint-icon"
        color="primary"
    >
      mdi-information
    </v-icon>
    <v-icon
        v-else-if="type === 'danger'"
        class="hint-icon"
        color="#E1000F"
    >
      mdi-alert
    </v-icon>
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "hint",
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    typeClass() {
      return this.type === 'danger' ? 'danger' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.hint {
  display: flex;
  align-items: center;
  background: #EFF0F6;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 25px;

  &.danger {
    background: #E1000F0D;
  }
}
.hint-icon {
  padding: 0 18px 0 4px;
  opacity: 1;
}
</style>
