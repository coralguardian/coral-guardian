<template>
  <div>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >

      <div class="double-input-container">
        <div class="double-input-item">
          <text-input
              :placeholder="$t('default.stepper.friend.form.firstname')"
              :rules="[rules.required, rules.specialChar]"
              v-model="friend.first_name"
          />
        </div>
        <div class="double-input-item">
          <text-input
              :placeholder="$t('default.stepper.friend.form.name')"
              :rules="[rules.required, rules.specialChar]"
              v-model="friend.last_name"
          />
        </div>

      </div>

      <text-input
          :placeholder="$t('default.stepper.friend.form.mail')"
          :rules="[rules.required, rules.email]"
          v-model="friend.email"
      />

      <v-textarea
          rows="3"
          no-resize
          color="tertiary"
          outlined
          :placeholder="$t('default.stepper.friend.form.message')"
          :rules="[rules.required, rules.utf8MaxLength]"
          v-model="friend.message"
          maxlength="500"
          counter
          :counter-value="v => v ? encodeURI(v).length : 0"
      />

    </v-form>
  </div>
</template>

<script>
import TextInput from "@/components/utils/TextInput";
import validationMixin from "@/mixins/validationMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "friend-information-step",
  components: {
    TextInput
  },
  mixins: [validationMixin],
  data() {
    return {
      message: "",
      maxLength: 500
    }
  },
  computed: {
    ...mapGetters({
      friend: "getFriend"
    })
  },
  mounted() {
    this.$root.$on(this.validationEventName, () => {
      this.updateForm({
        order: {
          type: "gift"
        }
      })
    })
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  }
}
</script>

<style scoped>

</style>
