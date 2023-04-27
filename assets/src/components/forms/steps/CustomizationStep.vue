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
            :class="order.quantity > 1 ? 'col-6' : 'col-12'"
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
      names: [],
      namesFile: null,
      loading: false,
      hasDownloaded: false
    }
  },
  computed: {
    ...mapGetters({
      order: 'getOrder',
      postAdoptionData: 'getAdopteeModel',
      orderToken: 'getOrderToken',
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
          this.post(this.postAdoptionData, this.apiData.endpoint)
              .then(() => {
                this.$root.$emit('ApiValid')
              })
        })
      } else {
        if (this.hasDownloaded) {
          this.updateForm({hasDownloaded: this.hasDownloaded})
          this.$root.$emit('ApiValid')
        } else {
          this.$root.$emit('displayError', 'download_file')
          this.$root.$emit('IsLoaded')
        }
      }
    },
    downloadExcelFile() {
      this.loading = true;
      this.get({responseType: 'blob', params: {token: this.orderToken}}, 'excel_template')
          .then(response => {
            const url = URL.createObjectURL(new Blob([response.data], {
              type: 'application/vnd.ms-excel'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'coralguardian-coral-sheet-name.xlsx')
            document.body.appendChild(link)
            link.click()
            this.hasDownloaded = true;
          })
          .catch(() => {
            this.$root.$emit('displayError')
          })
          .finally(() => {
            this.loading = false
          })
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
