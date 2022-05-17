<template>
  <div class="text-left">
    <p class="subtitles poppins-police">
      {{ $t("default.giftCustom.title") }}
    </p>

    <v-radio-group
        v-model="adopter.send_to_friend"
        :rules="[rules.notNull]"
    >
      <v-radio
          color="tertiary"
          :value="false"
      >
        <template v-slot:label>
          <p>{{ $t('default.giftCustom.radios.dont') }}</p>
        </template>
      </v-radio>
      <v-radio
          color="tertiary"
          :value="true"
      >
        <template v-slot:label>
          <p>{{ $t('default.giftCustom.radios.send') }}</p>
        </template>
      </v-radio>
    </v-radio-group>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "gift-custom-block",
  mixins: [validationMixin],
  components: {
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
      adopter: "getAdopter"
    })
  }
}
</script>

<style scoped>

</style>