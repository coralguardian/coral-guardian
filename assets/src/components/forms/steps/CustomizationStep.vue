<template>
  <div>
    <p v-html="$tc('default.stepper.customization.description.' + project, order.quantity, translation)"/>

    <v-form
        :ref="formRefName"
        v-model="valid"
    >
      <div class="d-flex flex-wrap">

        <div v-if="order.quantity >= 20">
          <br>
          <p class="font-weight-bold" v-html="$t('default.stepper.customization.downloadCsv.label')"/>
          <br>
          <v-btn primary @click="downloadExcelFile" :loading="loading" :disabled="loading">
            {{$t('default.stepper.customization.downloadCsv.btnLabel')}}
          </v-btn>
<!--          <div>-->
<!--            <p>{{$t('default.stepper.customization.downloadCsv.inputLabel')}}</p>-->
<!--            <v-file-input v-model="namesFile" accept=".xlsx" dense></v-file-input>-->
<!--          </div>-->
        </div>
        <div
            v-else
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

export default {
  name: "customization-step",
  components: {
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
      postAdoptionData: 'getPostAdoptionsData',
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