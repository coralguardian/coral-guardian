<template>
  <div>
    <p class="cg-title">
      {{ $t("default.giftCustom.title") }}
    </p>

    <v-radio-group
        v-model="adopter.send_to_friend"
        :rules="[rules.notNull]"
        @change="updateForm({adopter: {send_to_friend: $event}})"
    >
      <v-radio
          :value="false"
      >
        <template v-slot:label>
          <p class="cg-base-text">{{ $t('default.giftCustom.radios.dont') }}</p>
        </template>
      </v-radio>
      <v-radio
          :value="true"
      >
        <template v-slot:label>
          <p class="cg-base-text">{{ $t('default.giftCustom.radios.send') }}</p>
        </template>
      </v-radio>
    </v-radio-group>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import validationMixin from "../../../mixins/validationMixin";

export default {
  name: "gift-custom-block",
  mixins: [validationMixin],
  components: {},
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
  },
  methods: {
    ...mapActions({
      updateForm: 'updateForm'
    })
  }
}
</script>

<style scoped lang="scss">
.cg-base-text {
  line-height: 24px;
}
</style>
