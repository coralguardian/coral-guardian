<template>
  <div id="multipleRecipient" class="row text-left">
    <div class="col-12">
      <p v-html="$t('default.stepper.multipleRecipient.description')"/>
      <v-tabs
          fixed-tabs
          background-color="primary"
          class="black--text mt-5"
          v-model="tab"
          active-class="tertiary-tab-active"
      >
        <v-tab @change="updateForm({recipient: {type: 'fields'}})">
          {{ $t('default.stepper.multipleRecipient.tabs.fields.title') }}
        </v-tab>
        <v-tab @change="updateForm({recipient: {type: 'file'}})">
          {{ $t('default.stepper.multipleRecipient.tabs.file.title') }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">

        <v-tab-item class="recipients">
          <p class="my-5">
            {{ $t('default.stepper.multipleRecipient.tabs.fields.description') }}
          </p>
          <v-form
              v-if="tab === 0"
              :ref="formRefName"
              v-model="valid"
          >
            <div
                v-for="(recipient, index) in recipients"
                :key="index"
            >
              <p class="mb-1">
                {{ $t('default.stepper.multipleRecipient.tabs.fields.recipient', {index: index + 1}) }}
              </p>
              <recipient-block
                  :value="recipient"
                  @input="updateRecipients"
              />
            </div>
          </v-form>

        </v-tab-item>

        <v-tab-item>

          <p class="font-weight-bold my-5">{{ $t('default.stepper.multipleRecipient.tabs.file.subtitle') }}</p>
          <p>{{ $t('default.stepper.multipleRecipient.tabs.file.description') }}</p>
          <v-btn color="secondary" class="mt-5" :href="recipientFileUrl" target="_blank">
            {{ $t('default.stepper.multipleRecipient.tabs.file.button') }}
          </v-btn>

          <v-form
              v-if="tab === 1"
              :ref="formRefName"
              v-model="valid"
          >
            <p class="my-5">{{ $t('default.stepper.multipleRecipient.tabs.file.upload.description') }}</p>
            <v-file-input
                v-model="namesFile"
                chips
                :label="$t('default.stepper.multipleRecipient.tabs.file.upload.label')"
                outlined
                dense
                :rules="[rules.required]"
                accept=".xlsx"
            />
            <error-display :message="fileError"/>
          </v-form>
        </v-tab-item>

      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import ErrorDisplay from "../../../utils/ErrorDisplay";
import RecipientBlock from "../../blocks/RecipientBlock";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../../mixins/validationMixin";
import apiMixin from "../../../../mixins/apiMixin";
import FinalGiftForm from "../../../../forms/full/finalGiftForm";
import redirectionMixin from "../../../../mixins/redirectionMixin";

export default {
  name: "multiple-recipient-step",
  mixins: [validationMixin, apiMixin, redirectionMixin],
  components: {
    RecipientBlock,
    ErrorDisplay
  },
  data() {
    return {
      tab: null,
      namesFile: null,
      recipients: [],
      fileError: null
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      recipient: "getRecipient",
      giftModel: "getGiftModel"
    }),
    recipientFileUrl() {
      return this.baseUrl + "recipientsFile?adoptionUuid=" + this.order.uuid
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      loadForm: "loadForm"
    }),
    updateRecipients() {
      this.updateForm({gift: {recipients: this.recipients}})
    },
    createRecipients() {
      let recipients = []
      // eslint-disable-next-line no-unused-vars
      for (let i = 0; i < this.order.quantity; i++) {
        recipients.push({
          first_name: "",
          last_name: "",
          email: ""
        })
      }
      this.recipients = recipients
    },
    createGift() {
      if (this.namesFile !== null && this.recipient.type === "file") {
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let formData = new FormData();
        formData.append("recipient_file", this.namesFile);
        if (this.giftModel.to_send_on !== null) {
          formData.append("to_send_on", this.giftModel.to_send_on);
        }
        if (this.giftModel.message !== "") {
          formData.append("message", this.giftModel.message);
        }
        this.post(formData, "recipientFileImport", options)
            .then(() => {
              this.loadForm(new FinalGiftForm()).then(() => {
                this.cleanUrl()
                this.$root.$emit('ApiValid')
              })
            })
            .catch(() => {
              this.fileError = this.$t('default.errors.incorrect_file_data')
              this.$root.$emit('IsLoaded')
            })
      } else {
        this[this.apiData.method](this.giftModel, this.apiData.endpoint)
            .then(() => {
              this.loadForm(new FinalGiftForm()).then(() => {
                this.cleanUrl()
                this.$root.$emit('ApiValid')
              })
            })
            .catch(err => {
              console.error(err)
              this.$root.$emit('IsLoaded')
            })
      }
    },
    checkFileMode() {
      // cas d'une redirection sur l'étape pour continuer le process
      if (this.recipient.locked) {
        this.tab = 1
      } else {
        this.createRecipients()
      }
    }
  },
  mounted() {
    this.$root.$on(this.apiEventName, this.createGift)
    this.checkFileMode()
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style lang="scss" scoped>
#multipleRecipient {
  .recipients {
    max-height: 550px;
    overflow: auto;
  }
}
</style>