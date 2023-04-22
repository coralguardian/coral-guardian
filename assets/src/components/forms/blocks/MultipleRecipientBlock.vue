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
import RecipientBlock from "./RecipientBlock.vue";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../mixins/validationMixin";
import Hint from "@/components/utils/Hint.vue";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";

export default {
  name: "multiple-recipient-step",
  mixins: [validationMixin, itemTranslationMixin],
  components: {
    Hint,
    RecipientBlock,
  },
  data() {
    return {
      recipients: []
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      recipient: "getRecipient"
    })
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
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
    }
  },
  mounted() {
    this.createRecipients()
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
