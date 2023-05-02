<template>
  <div id="multipleRecipient">

    <p class="cg-title" v-html="$tc('default.stepper.multipleRecipient.title', order.quantity, translation)"/>

    <hint>
      <p class="cg-base-text" v-html="$t('default.stepper.multipleRecipient.description')"/>
    </hint>

    <p v-if="adopter.type === adopterEnum.company" v-html="$t('default.stepper.namingAdoption.description.company')"/>
    <div v-if="adopter.type === adopterEnum.company">
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
          <div v-if="tab === 0">
            <div
                v-for="(recipient, index) in recipients"
                :key="index"
            >
              <p class="cg-base-text mb-1">
                {{ $t('default.stepper.multipleRecipient.tabs.fields.recipient', {index: index + 1}) }} *
              </p>
              <recipient-block
                  :value="recipient"
                  @input="updateRecipients"
              />
            </div>
          </div>

        </v-tab-item>

        <v-tab-item>

          <p class="font-weight-bold my-5">{{ $t('default.stepper.multipleRecipient.tabs.file.subtitle') }}</p>
          <p>{{ $t('default.stepper.multipleRecipient.tabs.file.description') }}</p>
          <v-btn color="secondary" class="mt-5" :href="recipientFileUrl" target="_blank">
            {{ $t('default.stepper.multipleRecipient.tabs.file.button') }}
          </v-btn>

          <div
              v-if="tab === 1"
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
          </div>
        </v-tab-item>

      </v-tabs-items>
    </div>
    <div
        v-else
        class="recipients mt-5"
    >
      <div
          v-for="(recipient, index) in recipients"
          :key="index"
      >
        <p class="cg-base-text mb-1">
          {{ $t('default.stepper.multipleRecipient.tabs.fields.recipient', {index: index + 1}) }} *
        </p>
        <recipient-block
            :value="recipient"
            @input="updateRecipients"
        />
      </div>
    </div>

  </div>
</template>

<script>
import ErrorDisplay from "../../utils/ErrorDisplay.vue";
import RecipientBlock from "./RecipientBlock.vue";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";
import apiMixin from "../../../mixins/apiMixin";
import redirectionMixin from "../../../mixins/redirectionMixin";
import AdopterEnum from "@/enums/adopterEnum";
import Hint from "@/components/utils/Hint.vue";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "multiple-recipient-step",
  mixins: [validationMixin, apiMixin, redirectionMixin, itemTranslationMixin],
  components: {
    Hint,
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
      giftModel: "getGiftModel",
      adopter: "getAdopter"
    }),
    recipientFileUrl() {
      return this.baseUrl + "recipientsFile?adoptionUuid=" + this.order.uuid
    },
    adopterEnum() {
      return AdopterEnum
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
        this.post(formData, "recipientFileImport", options)
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('ApiValid')
          })
          .catch(() => {
            this.fileError = this.$t('default.errors.incorrect_file_data')
            this.$root.$emit('IsLoaded')
          })
      } else {
        this[this.apiData.method](this.giftModel, this.apiData.endpoint)
          .then(() => {
            this.cleanUrl()
            this.$root.$emit('ApiValid')
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
      }
      this.createRecipients()
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
