<template>
  <div id="multipleRecipient">

    <p class="cg-title" v-html="$tc('default.stepper.multipleRecipient.title', order.quantity, translation)"/>

    <hint class="mb-8">
      <p class="cg-base-text" v-html="$t('default.stepper.multipleRecipient.description')"/>
    </hint>

    <v-tabs
        fixed-tabs
        v-model="tab"
        active-class="tab-active"
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
        <p class="mt-10 mb-8 cg-base-text lower light">
          {{ $t('default.stepper.multipleRecipient.tabs.fields.description') }}
        </p>
        <div v-if="tab === 0">
          <div
              v-for="(recipient, index) in recipients"
              :key="index"
          >
            <p class="cg-base-text lower mb-1">
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

        <div
            v-if="tab === 1"
        >
          <p class="cg-base-text lower light mt-10 mb-8">{{ $t('default.stepper.multipleRecipient.tabs.file.upload.description') }}</p>
          <v-file-input
              v-model="namesFile"
              class="file-import-input"
              :label="$t('default.stepper.multipleRecipient.tabs.file.upload.label')"
              outlined
              :rules="[rules.required]"
              accept=".xlsx"
              prepend-inner-icon="mdi-upload"
              :prepend-icon="null"
              @change="updateFile"
          />
          <error-display :message="fileError"/>
        </div>
      </v-tab-item>

    </v-tabs-items>
  </div>

</template>

<script>
import ErrorDisplay from "../../utils/ErrorDisplay.vue";
import {mapGetters} from "vuex";
import AdopterEnum from "@/enums/adopterEnum";
import multipleRecipientMixin from "@/mixins/multipleRecipientMixin";

export default {
  name: "company-multiple-recipient-step",
  mixins: [multipleRecipientMixin],
  components: {
    ErrorDisplay
  },
  data() {
    return {
      tab: null,
      namesFile: null,
      fileError: null
    }
  },
  computed: {
    ...mapGetters({
      giftModel: "getGiftModel"
    }),
    adopterEnum() {
      return AdopterEnum
    }
  },
  methods: {
    updateFile(file) {
      this.updateForm({gift: {file: file}})
    }
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
