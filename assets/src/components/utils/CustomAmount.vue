<template>
  <div class="custom-amount">
    <text-input
        ref="customAmountTextInput"
        :value="value"
        :label="label ? $t(label) : null"
        :placeholder="placeholder ? $t(placeholder) : null"
        type="number"
        @change="emit"
        :tooltip="hint ? $t('default.stepper.adoption.customAmount.hint') : null"
        :rules="inputRules"
        icon="mdi-currency-eur"
    />
  </div>
</template>

<script>
import validationMixin from "@/mixins/validationMixin";
import TextInput from "@/components/utils/TextInput.vue";

export default {
  name: "custom-amount",
  components: {TextInput},
  mixins: [validationMixin],
  props: {
    value: {
      validator: prop => typeof prop === 'number' || prop === null,
      required: true
    },
    hint: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    minAmount: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: 'default.stepper.adoption.customAmount.label'
    },
    placeholder: {
      type: String,
      default: null
    },
    isRequired: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    inputRules() {
      let rules = [this.rules.minValue]
      if (this.isRequired) {
        rules.push(this.rules.required)
      }
      return rules
    }
  },
  methods: {
    setMinInput(value) {
      this.min = value
      this.getInput().$el.querySelector('input').min = value
    },
    getInput() {
      return this.$refs.customAmountTextInput
    },
    emit(value) {
      if (value < this.min) {
        this.getInput().getInput().$data.lazyValue = this.min
        value = this.min
      }
      this.$emit('input', Number(value))
    }
  }
}
</script>

<style scoped>

</style>
