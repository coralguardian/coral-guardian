<template>
  <div id="recipientStep">
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <multiple-recipient-block v-if="formType === formTypeEnum.advanced || adopter.type === adopterEnum.individual"/>
      <company-multiple-recipient-block
          v-else-if="formType === formTypeEnum.deposit && adopter.type === adopterEnum.company"/>

      <v-divider class="cg-divider my-6"/>

      <p class="cg-title" v-html="$t('default.stepper.header.customizationSend')"/>

      <hint>
        <p class="cg-base-text" v-html="$tc('default.stepper.customizationSend.message.description', order.quantity)"/>
      </hint>

      <v-textarea
          v-model="gift.message"
          class="mt-5 customization-textarea"
          rows="5"
          no-resize
          outlined
          :placeholder="$t('default.stepper.customizationSend.message.placeholder')"
          :rules="[rules.utf8MaxLength]"
          maxlength="500"
          counter
          :counter-value="v => v ? encodeURI(v).length : 0"
      />

      <v-switch
          class="scheduled-switch"
          v-model="scheduled"
          inset
      >
        <template v-slot:label>
          <p class="cg-base-text lower">{{ $t('default.stepper.customizationSend.send.checkbox') }}</p>
        </template>
      </v-switch>

      <p class="cg-base-text lower light" v-html="$t('default.stepper.customizationSend.send.description') "/>

      <div class="mt-5 d-inline-block" v-if="scheduled">
        <v-date-picker
            v-model="gift.toSendOn"
            :first-day-of-week="1"
            :locale="$i18n.locale"
            :min="tomorrow"
            :max="maxDate"
        />
      </div>

      <error-display :message="errorMessage"/>

    </v-form>
  </div>
</template>

<script>
import ErrorDisplay from "../../../utils/ErrorDisplay";
import validationMixin from "../../../../mixins/validationMixin";
import {mapActions, mapGetters, mapState} from "vuex";
import apiMixin from "@/mixins/apiMixin";
import MultipleRecipientBlock from "@/components/forms/blocks/MultipleRecipientBlock.vue";
import Hint from "@/components/utils/Hint.vue";
import AdopterEnum from "@/enums/adopterEnum";
import CompanyMultipleRecipientBlock from "@/components/forms/blocks/CompanyMultipleRecipientBlock.vue";
import DepositTypeEnum from "@/enums/depositTypeEnum";
import FormTypeEnum from "@/enums/formTypeEnum";
import queryParamsMixin from "@/mixins/queryParamsMixin";

export default {
  name: "recipient-customization-step",
  mixins: [validationMixin, apiMixin, queryParamsMixin],
  components: {
    CompanyMultipleRecipientBlock,
    Hint,
    ErrorDisplay,
    MultipleRecipientBlock
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
      adopter: "getAdopter",
      recipient: "getRecipient",
      order: "getOrder",
      recipientDepositFileModel: "getRecipientDepositFileModel",
      recipientDepositModel: "getRecipientDepositModel"
    }),
    ...mapState({
      formType: "formType"
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
    },
    formTypeEnum() {
      return FormTypeEnum
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
    checkGift() {
      if (this.$refs[this.formRefName].validate()) {
        if (this.formType === FormTypeEnum.deposit) {
          this.callApi()
        } else {
          this.basicValidation()
        }
      } else {
        this.$root.$emit("IsLoaded")
      }
    },
    basicValidation() {
      if (this.scheduled && this.gift.toSendOn === null) {
        this.errorMessage = this.$t("default.errors.select_date")
        this.$root.$emit("IsLoaded")
      } else {
        this.errorMessage = null
        this.$root.$emit("StepValid")
      }
    },
    callApi() {
      // destinataires avec fichier
      if (this.gift.file !== null && this.recipient.type === DepositTypeEnum.file) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        this.post(this.recipientDepositFileModel, "adoption/" + this.order.uuid + "/recipientsFile", headers)
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('StepValid')
          })
          .catch(() => {
            this.fileError = this.$t('default.errors.incorrect_file_data')
            this.$vuetify.goTo('#recipientStep', {offset: 200})
            this.$root.$emit('IsLoaded')
          })
        // destinataires via formulaire
      } else {
        this.post(this.recipientDepositModel, "adoption/" + this.order.uuid + "/friends")
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('StepValid')
          })
          .catch(err => {
            console.error(err)
            this.$vuetify.goTo('#recipientStep', {offset: 200})
            this.$root.$emit('IsLoaded')
          })
      }
    }
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => this.checkGift())
  },
  beforeDestroy() {
    this.$root.$off(this.customValidationEventName)
  }
}
</script>

<style lang="scss">
.customization-textarea {
  fieldset {
    color: #EFF0F6 !important;
    border-width: 2px !important;
    border-radius: 4px !important;
  }

  textarea {
    height: 200px !important;
    padding: 20px !important;
  }
}

.scheduled-switch {
  display: inline-block;
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 25px;
}

</style>
