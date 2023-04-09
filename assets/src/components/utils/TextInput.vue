<template>
  <div class="cg-input-container">
    <p
        v-if="label"
        class="text-left cg-base-text text-bolder mb-4"
    >
      {{label}}

      <btn-tooltip v-if="tooltip">
        <span>{{ tooltip }}</span>
      </btn-tooltip>
    </p>
    <v-text-field
        :ref="ref"
        class="cg-text-input"
        dense
        outlined
        :placeholder="placeholder"
        :rules="rules"
        :value="value"
        :maxLength="maxLength"
        :counter="counter"
        :type="type"
        rounded
        height="66"
        @change="$emit('input', sanitizeValue($event))"
        :append-icon="icon"
    />
  </div>

</template>

<script>
import BtnTooltip from "@/components/utils/BtnTooltip.vue";

export default {
  name: "text-input",
  components: {BtnTooltip},
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
    },
    counter: {
      default: false
    },
    maxLength: {
      type: Number,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    tooltip: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      ref: null
    }
  },
  methods: {
    setMinInput(value) {
      this.getInput().$el.querySelector('input').min = value
    },
    getInput() {
      return this.$refs[this.ref]
    },
    sanitizeValue(value) {
      if (this.min !== null && value < this.min) {
        this.getInput().$data.lazyValue = this.min
        value = this.min
      }
      return value
    }
  },
  beforeMount() {
    this.ref = crypto.randomUUID();
  },
  mounted() {
    if (this.min !== null) {
      this.setMinInput(this.min)
    }
  }
}
</script>

<style lang="scss">
.cg-input-container {
  width: 100%;

  .cg-text-input {
    .v-input__slot {
      border: 1px solid #EFF0F7 !important;
      border-radius: 46px !important;
      box-shadow: 0 2px 6px rgba(19, 18, 66, 0.07) !important;

      fieldset {
        border: unset !important;
      }

      .v-input__append-inner {
        height: 100%;
        margin: unset !important;

        .v-input__icon {
          width: 28px !important;
          height: 28px !important;
          align-self: center;
          justify-self: center;

          i {
            font-size: 28px !important;
            color: #A0A3BD !important;
          }
        }
      }
    }
  }
}

</style>
