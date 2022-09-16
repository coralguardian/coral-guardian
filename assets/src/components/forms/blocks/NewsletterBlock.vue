<template>
  <div class="text-left">
    <p class="subtitles poppins-police">
      {{ $t("default.newsletter.title") }}
    </p>
    <p>
      {{ $t(description) }}
    </p>
    <v-checkbox color="tertiary" class="mt-0" :input-value="value" @change="$emit('input', $event)">
      <template v-slot:label>
        <p class="black--text">{{ $t(label) }}</p>
      </template>
    </v-checkbox>
    <div v-if="full && value">
      <p class="mb-2" v-html="$t('default.newsletter.otherEmail.description')"/>
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
    label() {
      return this.target === ActionEnum.getTarget(ActionEnum.adoption) ? "default.newsletter.label.adoption" : "default.newsletter.label.other"
    },
    description() {
      return this.target === ActionEnum.getTarget(ActionEnum.adoption) ? "default.newsletter.description.adoption" : "default.newsletter.description.other"
    }
  }
}
</script>

<style scoped>

</style>