<template>
  <div>
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <multiple-recipient-block/>

      <v-divider class="cg-divider my-6"/>

      <p class="cg-title" v-html="$t('default.stepper.header.customizationSend')"/>

      <hint>
        <p class="cg-base-text" v-html="$t('default.stepper.customizationSend.message.description')"/>
      </hint>

      <v-textarea
          v-model="gift.message"
          class="mt-5 customization-textarea"
          rows="3"
          no-resize
          outlined
          :placeholder="$t('default.stepper.customizationSend.message.placeholder')"
          maxlength="490"
          counter
      />

      <p class="cg-base-text light" v-html="$t('default.stepper.customizationSend.send.description') "/>

      <v-switch
          v-model="scheduled"
          inset
      >
        <template v-slot:label>
          <p class="cg-base-text">{{ $t('default.stepper.customizationSend.send.checkbox') }}</p>
        </template>
      </v-switch>

      <v-row>
        <v-date-picker
            v-if="scheduled"
            v-model="gift.toSendOn"
            :first-day-of-week="1"
            :locale="$i18n.locale"
            :min="tomorrow"
            :max="maxDate"
        />
      </v-row>

      <error-display :message="errorMessage"/>

    </v-form>
  </div>
</template>

<script>
import ErrorDisplay from "../../../utils/ErrorDisplay";
import validationMixin from "../../../../mixins/validationMixin";
import {mapActions, mapGetters} from "vuex";
import apiMixin from "@/mixins/apiMixin";
import MultipleRecipientBlock from "@/components/forms/blocks/MultipleRecipientBlock.vue";
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "recipient-customization-step",
  mixins: [validationMixin, apiMixin],
  components: {
    Hint,
    ErrorDisplay,
    MultipleRecipientBlock
  },
  data() {
    return {
      scheduled: false,
      errorMessage: null
    }
  },
  computed: {
    ...mapGetters({
      gift: "getGift",
      giftMessageModel: "getGiftMessageModel"
    }),
    tomorrow() {
      const tomorrow = new Date(new Date())
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString()
    },
    maxDate() {
      const max = new Date(new Date())
      max.setDate(max.getDate() + 365)
      return max.toISOString()
    }
  },
  watch: {
    scheduled(value) {
      if (!value) {
        this.updateForm({gift: {toSendOn: null}})
      }
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    check() {
      if (this.$refs[this.formRefName].validate()) {
        if (this.scheduled && this.gift.toSendOn === null) {
          this.errorMessage = this.$t("default.errors.select_date")
          this.$root.$emit("IsLoaded")
        } else {
          this.errorMessage = null
          this.$root.$emit("StepValid")
        }
      } else {
        this.$root.$emit("IsLoaded")
      }
    },
    sendMessageData() {
      this[this.apiData.method](this.giftMessageModel, this.apiData.endpoint)
        .then(() => {
          this.$root.$emit('ApiValid')
        })
        .catch(err => {
          this.$root.$emit('displayError', err.response.data)
        })
        .finally(() => {
          this.$root.$emit('IsLoaded')
        })
    }
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => this.check())
    this.$root.$on(this.apiEventName, () => this.sendMessageData())
  },
  beforeDestroy() {
    this.$root.$off(this.customValidationEventName)
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style lang="scss" scoped>
.customization-textarea textarea {
  border: 2px solid #EFF0F6 !important;
  border-radius: 4px !important;
}

</style>
