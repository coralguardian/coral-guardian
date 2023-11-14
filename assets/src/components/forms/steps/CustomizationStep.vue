<template>
  <div>
    <hint>
      <p class="cg-base-text text-left" v-html="$tc('default.stepper.customization.description.' + project, order.quantity, translation)"/>
    </hint>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <div class="d-flex flex-wrap mt-4">
        <div
            :class="order.quantity > 1 ? 'col-sm-6 col-12' : 'col-12'"
            v-for="n in order.quantity"
            :key="n"
        >
          <text-input
              :rules="[rules.required, rules.minLength, rules.specialChar]"
              :label="$tc('default.stepper.customization.input.label.' + project, order.quantity, {number: n, item: translation.item})"
              :placeholder="$t('default.stepper.customization.input.placeholder.' + project, singular)"
              v-model="names[n-1]"
          />
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import itemTranslationMixin from "@/mixins/itemTranslationMixin";
import TextInput from "@/components/utils/TextInput";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "@/mixins/validationMixin";
import apiMixin from "@/mixins/apiMixin";
import Hint from "@/components/utils/Hint.vue";

export default {
  name: "customization-step",
  components: {
    Hint,
    TextInput
  },
  mixins: [itemTranslationMixin, validationMixin, apiMixin],
  data() {
    return {
      names: []
    }
  },
  computed: {
    ...mapGetters({
      order: 'getOrder',
      adopteeDepositModel: 'getAdopteeDepositModel',
      project: "getProject"
    })
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    postNames() {
      if (this.names.length === this.order.quantity) {
        this.updateForm({adoption: {names: this.names}}).then(() => {
          this.post(this.adopteeDepositModel, 'adoption/' + this.order.uuid + '/names')
            .then(() => this.$root.$emit("ApiValid"))
            .catch(() => {
              this.$root.$emit("IsLoaded")
            })
        })
      }
    }
  },
  mounted() {
    this.$root.$on(this.apiEventName, this.postNames)
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style scoped>

</style>
