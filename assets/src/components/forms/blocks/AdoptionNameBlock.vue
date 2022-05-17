<template>
    <text-input
        :rules="[rules.required, rules.minLength, rules.specialChar]"
        :label="$tc('default.stepper.customization.input.label', order.quantity, {number: n, item: translation.item})"
        :placeholder="$t('default.stepper.customization.input.placeholder', singular)"
        v-model="value"
        @input="$emit('input', value)"
    />
</template>

<script>
import TextInput from "../../utils/TextInput";
import validationMixin from "../../../mixins/validationMixin";
import itemTranslationMixin from "../../../mixins/itemTranslationMixin";

export default {
  name: "adoption-name-block",
  mixins: [validationMixin, itemTranslationMixin],
  components: {
    TextInput
  },
  props: {
    value: null,
    n: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>