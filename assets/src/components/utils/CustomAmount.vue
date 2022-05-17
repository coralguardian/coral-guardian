<template>
  <div class="custom-amount">
    <v-row
        class="align-center justify-center"
        dense
    >
      <v-col cols="6" sm="4">
        <span class="text-body-2">{{ $t('default.stepper.adoption.customAmount.label') }}</span>
      </v-col>
      <v-col cols="3">
        <v-text-field
            ref="customAmountInput"
            :value="value"
            class="input-right"
            type="number"
            color="tertiary"
            suffix="€"
            @change="emit"
            :rules="[rules.minValue, rules.required]"
        />
      </v-col>
      <v-col cols="1" v-if="hint">*</v-col>
    </v-row>

    <v-row dense class="text-caption" v-if="hint">
      * {{ $t('default.stepper.adoption.customAmount.hint') }}
    </v-row>

  </div>
</template>

<script>
import validationMixin from "@/mixins/validationMixin";

export default {
  name: "custom-amount",
  props: {
    value: {
      validator: prop => typeof prop === 'number' || prop === null,
      required: true
    },
    hint: {
      type: Boolean,
      default: true
    }
  },
  mixins: [validationMixin],
  data() {
    return {}
  },
  methods: {
    setMinInput(value) {
      this.min = value
      this.getInput().$el.querySelector('input').min = value
    },
    getInput() {
      return this.$refs.customAmountInput
    },
    emit(value) {
      if (value < this.min) {
        this.getInput().$data.lazyValue = this.min
        value = this.min
      }
      this.$emit('input', Number(value))
    }
  }
}
</script>

<style scoped>

</style>