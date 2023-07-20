import validationMixin from "@/mixins/validationMixin";
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import Hint from "@/components/utils/Hint.vue";
import RecipientBlock from "@/components/forms/blocks/RecipientBlock.vue";
import {mapActions, mapGetters} from "vuex";

export default {
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
