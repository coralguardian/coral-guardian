<template>
  <div class="d-flex justify-center align-center">

    <div class="incrementor d-flex justify-space-around align-center" :class="{big: big}">

      <incrementor-btn
          :increment="false"
          :count="options.count"
          icon="mdi-minus"
          :big="big"
      />

      <div class="d-flex counter primary justify-center text--primary flex-column text-body-2" :class="{big: big}">

        <span class="text-center font-weight-bold">{{ options.count }}</span>
        <span>{{ item }}</span>

      </div>

      <incrementor-btn
          icon="mdi-plus"
          :count="options.count"
          :max="options.maxCount"
          :big="big"
      />

    </div>

  </div>
</template>

<script>
import IncrementorBtn from "@/components/old/IncrementorBtn.vue";

export default {
  name: "incrementor",
  components: {
    IncrementorBtn
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    item: {
      type: String,
      required: true
    },
    big: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {

  &.big  {
    width: $incrementor-size * 1.5 !important;
    height: $incrementor-size * 1.5 !important;

    > * {
      font-size: 18px;
    }
  }

  &:not(.big) {
    width: $incrementor-size !important;
    height: $incrementor-size !important;
  }

  border-radius: 100%;
  span {
    color: $tertiary
  }
}

.incrementor {
  &.big  {
    width: 70%
  }

  @media (max-width: 450px) {
    &.big  {
      width: 100%
    }
  }

  &:not(.big) {
    width: 50%
  }
}
</style>
