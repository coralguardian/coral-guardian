<template>
  <div>
    <div class="cg-stepper-progress" :class="{'completed': state === 'completed'}">
      <div v-if="state === 'progress'" class="part-progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stepper-header-progress",
  props: {
    state: {
      type: String,
      default: 'empty'
    }
  }
}
</script>

<style lang="scss">
.step-header-container {
  display: flex;
  align-items: center;
}

.cg-stepper-progress, .part-progress {
  height: 6px;
  border-radius: 40px;
}

.cg-stepper-progress {
  width: 60px;
  background: #EFF0F7;

  &.completed {
    background: $primary;
  }
}

.part-progress {
  width: 30px;
  background: $primary;
}
</style>
