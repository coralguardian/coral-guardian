<template>
  <div id="namingAdoption">
    <div v-if="adopter.type === adopterEnum.company">
      <hint>
        <p class="cg-base-text"
           v-html="$tc('default.stepper.namingAdoption.description.' + project, order.quantity, translation)"/>
      </hint>

      <p
          v-if="adoption.type !== null"
          class="cg-base-text"
          v-html="$t('default.stepper.namingAdoption.description.company')"
      />

      <v-tabs
          v-if="adoption.type !== null"
          fixed-tabs
          class="mt-13 mb-8"
          v-model="tab"
          active-class="tab-active"
      >
        <v-tab @change="updateForm({adoption: {type: 'fields'}})">
            <span class="cg-base-text light text-no-transform">
              {{ $t('default.stepper.namingAdoption.tabs.fields.title') }}
            </span>
        </v-tab>
        <v-tab @change="updateForm({adoption: {type: 'file'}})">
            <span class="cg-base-text light text-no-transform">
              {{ $t('default.stepper.namingAdoption.tabs.file.title') }}
            </span>
        </v-tab>

      </v-tabs>

      <v-tabs-items v-model="tab" v-if="adoption.type !== null">

        <v-tab-item class="adoptions">
          <v-form
              v-if="tab === 0"
              :ref="formRefName"
              v-model="valid"
          >
            <v-row>
              <v-col
                  cols="6"
                  v-for="n in order.quantity"
                  :key="n"
              >
                <adoption-name-block
                    v-model="adoption.names[n-1]"
                    :n="n"
                />
              </v-col>
            </v-row>
          </v-form>

        </v-tab-item>

        <v-tab-item class="mb-4">

          <p class="cg-base-text light file-description mt-2 mb-6">
            {{ $t('default.stepper.namingAdoption.tabs.file.description', plural) }}
          </p>

          <v-btn depressed :elevation="null" class="download-btn" :href="adoptionFileUrl" target="_blank">
            <v-icon color="primary" class="mr-2">
              mdi-download
            </v-icon>
            {{ $t('default.stepper.namingAdoption.tabs.file.button') }}
          </v-btn>

          <v-form
              v-if="tab === 1"
              :ref="formRefName"
              v-model="valid"
          >
            <p class="my-5">{{ $t('default.stepper.namingAdoption.tabs.file.upload.description') }}</p>
            <v-file-input
                v-model="namesFile"
                chips
                :label="$t('default.stepper.namingAdoption.tabs.file.upload.label')"
                outlined
                dense
                :rules="[rules.required]"
                accept=".xlsx"
            />
          </v-form>
        </v-tab-item>

      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import AdoptionNameBlock from "../../blocks/AdoptionNameBlock";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../../mixins/validationMixin";
import itemTranslationMixin from "../../../../mixins/itemTranslationMixin";
import apiMixin from "../../../../mixins/apiMixin";
import redirectionMixin from "../../../../mixins/redirectionMixin";
import AdopterEnum from "@/enums/adopterEnum";
import Hint from "@/components/utils/Hint.vue";
import AdoptionTypeEnum from "@/enums/adoptionTypeEnum";

export default {
  name: "naming-adoption-step",
  mixins: [validationMixin, itemTranslationMixin, apiMixin, redirectionMixin],
  components: {
    Hint,
    AdoptionNameBlock
  },
  data() {
    return {
      tab: null,
      namesFile: null
    }
  },
  computed: {
    ...mapGetters({
      adoption: "getAdoption",
      adoptionModel: "getPostAdoptionsData",
      order: "getOrder",
      adopter: "getAdopter",
      project: "getProject"
    }),
    adoptionFileUrl() {
      return this.baseUrl + "namingFile?adoptionUuid=" + this.adoptionModel.adoptionUuid
    },
    adopterEnum() {
      return AdopterEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    createAdoption() {
      if (this.adoption.type === null) {
        // je n'ai pas d'inspiration
        this.$root.$emit('StepValid')
      } else {
        // il me faut les noms
        if (this.adoption.type === AdoptionTypeEnum.fields) {
          this.$root.$emit(this.validationEventName)
        } else {
          // c'est le fichier faudra parser
        }
      }
      //   const options = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   let formData = new FormData();
      //   formData.append("adoption_file", this.namesFile);
      //   this.post(formData, "namingFileImport", options)
      //     .then(() => {
      //       this.cleanUrl()
      //       this.$root.$emit('ApiValid')
      //     })
      //     .catch(err => {
      //       alert(err.response.data)
      //       this.$root.$emit('IsLoaded')
      //     })
      // } else {
      //   // adoption classique par formulaire
      //   this[this.apiData.method](this.adoptionModel, this.apiData.endpoint)
      //     .then(() => {
      //       this.cleanUrl()
      //       this.$root.$emit('ApiValid')
      //     })
      //     .catch(err => {
      //       console.error(err)
      //       this.$root.$emit('IsLoaded')
      //     })
      // }
    },
    updateAdoptionType(value) {
      if (value === false) {
        this.valid = false
        this.updateForm({adoption: {type: AdoptionTypeEnum.fields}})
      } else {
        this.valid = true
        this.updateForm({adoption: {type: null}})
      }
    }
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, this.createAdoption)
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

  .file-description {
    font-size: 16px;
    line-height: 30px;
  }

  .download-btn {
    background: white !important;
    border-bottom: 1px solid $primary !important;
    text-transform: none !important;
    border-radius: unset !important;
    padding: 25px 15px !important;
    color: $primary !important;
  }
}
</style>
