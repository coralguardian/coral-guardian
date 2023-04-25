<template>
  <div>
    <p class="cg-title" v-if="isAdoption">
      {{ $t("default.newsletter.title") }}
    </p>

    <v-checkbox class="mt-0" :input-value="value" @change="$emit('input', $event)">
      <template v-slot:label>
        <p class="cg-base-text" v-html="$t(label)"/>
      </template>
    </v-checkbox>

    <div v-if="full && value">
      <p class="mb-5 cg-base-text light lower" v-html="$t('default.newsletter.otherEmail.description')"/>
      <text-input
          :placeholder="$t('default.newsletter.otherEmail.email')"
          v-model="adopter.alternate_newsletter_email"
      />
    </div>

  </div>
</template>

<script>
import TextInput from "../../utils/TextInput";
import {mapGetters} from "vuex";
import ActionEnum from "@/enums/actionEnum";

export default {
  name: "newsletter-block",
  components: {
    TextInput
  },
  props: {
    value: null,
    full: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      target: "getTarget"
    }),
    isAdoption() {
      return this.target === ActionEnum.getTarget(ActionEnum.adoption) || this.target === ActionEnum.getTarget(ActionEnum.gift)
    },
    label() {
      return this.isAdoption ? "default.newsletter.label.adoption" : "default.newsletter.label.donation"
    }
  }
}
</script>

<style scoped>

</style>
