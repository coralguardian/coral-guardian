<template>
  <div class="custom-amount">
    <text-input
        :value="value"
        :label="$t('default.stepper.adoption.customAmount.label')"
        type="number"
        @input="$emit('input', Number($event))"
        :tooltip="hint ? $t('default.stepper.adoption.customAmount.hint') : null"
        :rules="[rules.minValue, rules.required]"
        :min="minAmount"
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
    }
  }
}
</script>

<style scoped>

</style>
