<template>
  <div id="gift-step">
    <p
        class="mb-10 cg-base-text"
        v-html="$t('default.stepper.gift.description')"
    />
    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <div class="row">
        <text-input
            class="col-12 col-sm-6"
            :rules="[rules.required]"
            :label="$t('default.stepper.gift.input.label')"
            :placeholder="$t('default.stepper.gift.input.placeholder')"
            v-model="order.giftCode"
        />
      </div>
    </v-form>
  </div>
</template>

<script>
import TextInput from "@/components/utils/TextInput";
import validationMixin from "@/mixins/validationMixin";
import apiMixin from "@/mixins/apiMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "gift-step",
  components: {
    TextInput
  },
  mixins: [validationMixin, apiMixin],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder"
    })
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    checkOrderToken() {
      this[this.apiData.method]({gift_code: this.order.giftCode}, this.apiData.endpoint)
          .then((resp) => {
            let types = resp.data.type.split(".")
            let data = {
              order: {
                uuid: resp.data.uuid,
                productType: types[0],
                quantity: resp.data.quantity
              },
              adopter: {
                send_to_friend: resp.data.sendToFriend
              },
              project: resp.data.project
            }
            if (types[1] !== undefined) {
              data.order.specificType = types[1]
            }
            this.updateForm(data).then(() => this.$root.$emit('ApiValid'))
            this.$root.$emit('IsLoaded')
          })
          .catch(err => {
            this.$root.$emit('displayError', err.response.data)
            this.$root.$emit('IsLoaded')
          })
    }
  },
  mounted() {
    this.$root.$on(this.apiEventName, this.checkOrderToken)
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style lang="scss" scoped>
</style>
