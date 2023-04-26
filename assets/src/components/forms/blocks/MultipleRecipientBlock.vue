<template>
  <div id="multipleRecipient">

    <p class="cg-title" v-html="$tc('default.stepper.multipleRecipient.title', order.quantity, translation)"/>

    <hint>
      <p class="cg-base-text" v-html="$t('default.stepper.multipleRecipient.description')"/>
    </hint>

    <div class="recipients mt-5">
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
import multipleRecipientMixin from "@/mixins/multipleRecipientMixin";

export default {
  name: "multiple-recipient-step",
  mixins: [multipleRecipientMixin],
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
