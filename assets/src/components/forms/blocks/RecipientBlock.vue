<template>
  <div>
    <div class="double-input-container">
      <div class="double-input-item">
        <text-input
            :placeholder="$t('default.stepper.friend.form.firstname')"
            :rules="[rules.required, rules.specialChar]"
            v-model="value.first_name"
            @input="$emit('input', value)"
        />
      </div>
      <div class="double-input-item">
        <text-input
            :placeholder="$t('default.stepper.friend.form.name')"
            :rules="[rules.required, rules.specialChar]"
            v-model="value.last_name"
            @input="$emit('input', value)"
        />
      </div>
    </div>

    <text-input
        :placeholder="$t('default.stepper.friend.form.mail')"
        :rules="[rules.required, rules.email]"
        v-model="value.email"
        @input="$emit('input', value)"
    />
  </div>
</template>

<script>
import TextInput from "../../utils/TextInput";
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "recipient-block",
  mixins: [validationMixin],
  components: {
    TextInput
  },
  props: {
    value: null
  }
}
</script>

<style scoped>

</style>