<template>
  <div id="namingAdoption">
    <v-form
        :ref="formRefName"
        v-model="valid"
    >

      <multiple-adoption-block
          v-if="formType === formTypeEnum.advanced || adopter.type === adopterEnum.individual"
      />
      <company-multiple-adoption-block
          v-if="formType === formTypeEnum.deposit && adopter.type === adopterEnum.company"
      />

    </v-form>

    <div v-if="formType === formTypeEnum.advanced">
      <v-checkbox class="mt-0" :input-value="adoption.type === null" @change="updateAdoptionType($event)">
        <template v-slot:label>
          <p class="cg-base-text" v-html="$t('default.stepper.namingAdoption.no_idea.' + adopter.type)"/>
        </template>
      </v-checkbox>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import AdopterEnum from "@/enums/adopterEnum";
import DepositTypeEnum from "@/enums/depositTypeEnum";
import FormTypeEnum from "@/enums/formTypeEnum";
import MultipleAdoptionBlock from "@/components/forms/blocks/MultipleAdoptionBlock.vue";
import CompanyMultipleAdoptionBlock from "@/components/forms/blocks/CompanyMultipleAdoptionBlock.vue";
import validationMixin from "@/mixins/validationMixin";
import apiMixin from "@/mixins/apiMixin";
import queryParamsMixin from "@/mixins/queryParamsMixin";

export default {
  name: "naming-adoption-step",
  mixins: [validationMixin, apiMixin, queryParamsMixin],
  components: {
    MultipleAdoptionBlock,
    CompanyMultipleAdoptionBlock
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      adoption: "getAdoption",
      adopter: "getAdopter",
      order: "getOrder",
      adopteeDepositModel: "getAdopteeDepositModel"
    }),
    ...mapState({
      formType: "formType"
    }),
    adopterEnum() {
      return AdopterEnum
    },
    formTypeEnum() {
      return FormTypeEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    checkAdoption() {
      if (this.formType === FormTypeEnum.deposit) {
        this.callApi()
      } else {
        this.basicValidation()
      }
    },
    updateAdoptionType(value) {
      if (value === false) {
        this.updateForm({adoption: {type: DepositTypeEnum.fields}})
      } else {
        this.updateForm({adoption: {type: null, names: []}})
      }
    },
    // formulaire de dépot, on a besoin des noms et de les POST
    callApi() {
      if (this.$refs[this.formRefName].validate()) {
        if (this.adoption.type === DepositTypeEnum.fields) {
          this.post(this.adopteeDepositModel, 'adoption/' + this.order.uuid + '/names')
            .then(() => this.$root.$emit("StepValid"))
            .catch(() => {
              this.$vuetify.goTo('#namingAdoption', {offset: 200})
              this.$root.$emit("IsLoaded")
            })
        } else {
          const headers = {
              'Content-Type': 'multipart/form-data'
          }
          this.post(this.createFormData(), "adoption/" + this.order.uuid + "/namesFile", headers)
            .then(() => {
              this.cleanUrl()
              this.$root.$emit('StepValid')
            })
            .catch(() => {
              this.$vuetify.goTo('#namingAdoption', {offset: 200})
              this.$root.$emit('IsLoaded')
            })
        }
      } else {
        this.$root.$emit("IsLoaded")
      }
    },
    // dans le chemin normal avant le paiement
    basicValidation() {
      if (this.adoption.type === null) {
        // je n'ai pas d'inspiration
        this.$root.$emit('StepValid')
      } else {
        // il me faut les noms
        if (this.adoption.type === DepositTypeEnum.fields) {
          if (this.$refs[this.formRefName].validate()) {
            this.$root.$emit("StepValid")
          } else {
            this.$root.$emit("IsLoaded")
          }
        }
      }
    },
    createFormData() {
      let formData = new FormData();
      formData.append("adoption_file", this.adoption.file);
      return formData
    }
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, this.checkAdoption)
  },
  beforeDestroy() {
    this.$root.$off(this.customValidationEventName)
  }
}
</script>

<style lang="scss" scoped>
#namingAdoption {
  .adoptions {
    max-height: 550px;
    overflow: auto;
  }
}
</style>
