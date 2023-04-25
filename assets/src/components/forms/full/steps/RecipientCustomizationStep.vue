<template>
  <div>
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <multiple-recipient-block v-if="adopter.type === adopterEnum.individual"/>
      <company-multiple-recipient-step v-else-if="adopter.type === adopterEnum.company"/>

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
import AdopterEnum from "@/enums/adopterEnum";
import CompanyMultipleRecipientStep from "@/components/forms/blocks/CompanyMultipleRecipientBlock.vue";
import DepositTypeEnum from "@/enums/depositTypeEnum";

export default {
  name: "recipient-customization-step",
  mixins: [validationMixin, apiMixin],
  components: {
    CompanyMultipleRecipientStep,
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
      giftMessageModel: "getGiftMessageModel",
      adopter: "getAdopter",
      recipient: "getRecipient",
      giftOrderModel: "getGiftOrderModel"
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
    },
    adopterEnum() {
      return AdopterEnum
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
    createGift() {
      // destinataires avec fichier
      if (this.gift.file !== null && this.recipient.type === DepositTypeEnum.file) {
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let formData = new FormData();
        formData.append("recipient_file", this.gift.file);
        this.post(formData, "adoption/{uuid}/recipientsFile", options)
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('ApiValid')
          })
          .catch(() => {
            this.fileError = this.$t('default.errors.incorrect_file_data')
            this.$root.$emit('IsLoaded')
          })
        // destinataires via formulaire
      } else {
        this.post(this.giftOrderModel, "adoption/{uuid}/recipientsFile")
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('ApiValid')
          })
          .catch(err => {
            console.error(err)
            this.$root.$emit('IsLoaded')
          })
      }
    }
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => this.check())
    this.$root.$on(this.apiEventName, () => this.createGift())
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
