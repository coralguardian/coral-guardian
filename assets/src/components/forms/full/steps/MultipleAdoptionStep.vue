<template>
  <div id="multipleAdoption" class="row text-left">
    <div class="col-12">
      <p v-html="$tc('default.stepper.multipleAdoption.description', order.quantity, translation)"/>
      <v-tabs
          fixed-tabs
          background-color="primary"
          class="black--text mt-5"
          v-model="tab"
          active-class="tertiary-tab-active"
      >
        <v-tab @change="updateForm({adoption: {type: 'fields'}})">
          {{ $t('default.stepper.multipleAdoption.tabs.fields.title') }}
        </v-tab>
        <v-tab @change="updateForm({adoption: {type: 'file'}})">
          {{ $t('default.stepper.multipleAdoption.tabs.file.title') }}
        </v-tab>

      </v-tabs>

      <v-tabs-items v-model="tab">

        <v-tab-item class="adoptions">
          <p class="my-5">{{ $t('default.stepper.multipleAdoption.tabs.fields.description', singular) }}</p>
          <v-form
              v-if="tab === 0"
              :ref="formRefName"
              v-model="valid"
          >
            <div class="row">
              <div
                  v-for="n in order.quantity"
                  :key="n"
                  :class="order.quantity > 1 ? 'col-6' : 'col-12'"
              >
                <adoption-name-block
                    v-model="adoption.names[n-1]"
                    :n="n"
                />
              </div>
            </div>
          </v-form>

        </v-tab-item>

        <v-tab-item>

          <p class="font-weight-bold my-5">{{ $t('default.stepper.multipleAdoption.tabs.file.subtitle', plural) }}</p>
          <p>{{ $t('default.stepper.multipleAdoption.tabs.file.description') }}</p>
          <v-btn color="secondary" class="mt-5" :href="adoptionFileUrl" target="_blank">
            {{ $t('default.stepper.multipleAdoption.tabs.file.button') }}
          </v-btn>

          <v-form
              v-if="tab === 1"
              :ref="formRefName"
              v-model="valid"
          >
            <p class="my-5">{{ $t('default.stepper.multipleAdoption.tabs.file.upload.description') }}</p>
            <v-file-input
                v-model="namesFile"
                chips
                :label="$t('default.stepper.multipleAdoption.tabs.file.upload.label')"
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

export default {
  name: "multiple-adoption-step",
  mixins: [validationMixin, itemTranslationMixin, apiMixin, redirectionMixin],
  components: {
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
      adoptionModel: "getPostAdoptionsData"
    }),
    adoptionFileUrl() {
      return this.baseUrl + "namingFile?adoption_uuid=" + this.adoptionModel.adoptionUuid
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    createAdoption() {
      // adoption avec le fichier après avoir été redirigé sur cette étape
      if (this.namesFile !== null && this.adoption.type === "file") {
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let formData = new FormData();
        formData.append("adoption_file", this.namesFile);
        this.post(formData, "namingFileImport", options)
            .then(() => {
              this.cleanUrl()
              this.$root.$emit('ApiValid')
            })
            .catch(err => {
              alert(err.response.data)
              this.$root.$emit('IsLoaded')
            })
      } else {
        // adoption classique par formulaire
        this[this.apiData.method](this.adoptionModel, this.apiData.endpoint)
            .then(() => {
              this.cleanUrl()
              this.$root.$emit('ApiValid')
            })
            .catch(err => {
              console.error(err)
              this.$root.$emit('IsLoaded')
            })
      }
    },
    checkFileMode() {
      // cas d'une redirection sur l'étape pour continuer le process
      if (this.adoption.locked) {
        this.tab = 1
      }
    }
  },
  mounted() {
    this.$root.$on(this.apiEventName, this.createAdoption)
    this.checkFileMode()
  },
  beforeDestroy() {
    this.$root.$off(this.apiEventName)
  }
}
</script>

<style lang="scss" scoped>
#multipleAdoption {
  .adoptions {
    max-height: 550px;
    overflow: auto;
  }
}
</style>