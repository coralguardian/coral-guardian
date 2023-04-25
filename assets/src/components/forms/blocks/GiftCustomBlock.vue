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
          :value="sendToFriendEnum.dont"
      >
        <template v-slot:label>
          <p class="cg-base-text lower">{{ $t('default.giftCustom.radios.dont') }}</p>
        </template>
      </v-radio>
      <v-radio
          :value="sendToFriendEnum.send"
      >
        <template v-slot:label>
          <p class="cg-base-text lower">{{ $t('default.giftCustom.radios.send.' + adopter.type) }}</p>
        </template>
      </v-radio>
      <v-radio
          :value="sendToFriendEnum.later"
      >
        <template v-slot:label>
          <p class="cg-base-text lower">{{ $t('default.giftCustom.radios.later') }}</p>
        </template>
      </v-radio>
    </v-radio-group>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import SendToFriendEnum from "@/enums/sendToFriendEnum";
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
    }),
    sendToFriendEnum() {
      return SendToFriendEnum
    }
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
