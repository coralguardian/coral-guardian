<template>
  <div class="row text-left">
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <div class="col-12">
        <p class="subtitles poppins-police">
          {{ $t('default.stepper.customizationSend.message.title') }}
        </p>
        <p v-html="$t('default.stepper.customizationSend.message.description')"/>

        <v-textarea
            v-model="gift.message"
            class="mt-5"
            rows="3"
            no-resize
            color="tertiary"
            outlined
            :placeholder="$t('default.stepper.customizationSend.message.placeholder')"
            :rules="[rules.utf8MaxLength]"
            maxlength="450"
            counter
            :counter-value="v => v ? encodeURI(v).length : 0"
        />
      </div>
      <div class="col-12">
        <p class="subtitles poppins-police">
          {{ $t('default.stepper.customizationSend.send.title') }}
        </p>
        <p>{{ $t('default.stepper.customizationSend.send.description1') }}</p>
        <p class="mt-5">{{ $t('default.stepper.customizationSend.send.description2') }}</p>
        <v-checkbox color="tertiary" v-model="scheduled">
          <template v-slot:label>
            <p class="black--text">{{ $t('default.stepper.customizationSend.send.checkbox') }}</p>
          </template>
        </v-checkbox>
        <v-date-picker
            v-if="scheduled"
            v-model="gift.toSendOn"
            color="tertiary"
            :first-day-of-week="1"
            :locale="$i18n.locale"
            :min="tomorrow"
            :max="maxDate"
        />
        <error-display :message="errorMessage"></error-display>
      </div>
    </v-form>
  </div>
</template>

<script>
import ErrorDisplay from "../../../utils/ErrorDisplay";
import validationMixin from "../../../../mixins/validationMixin";
import {mapActions, mapGetters} from "vuex";
import apiMixin from "@/mixins/apiMixin";

export default {
  name: "customization-send-step",
  mixins: [validationMixin, apiMixin],
  components: {
    ErrorDisplay
  },
  data() {
    return {
      scheduled: false,
      errorMessage: null,
      maxLength: 500
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
      if (this.scheduled && this.gift.toSendOn === null) {
        this.errorMessage = this.$t("default.errors.select_date")
        this.$root.$emit("IsLoaded")
      } else {
        this.errorMessage = null
        this.$root.$emit("StepValid")
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

<style scoped>

</style>
