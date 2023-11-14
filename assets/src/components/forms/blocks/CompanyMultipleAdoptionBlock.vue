<template>
  <div id="namingAdoption">
    <hint>
      <p class="cg-base-text"
         v-html="$tc('default.stepper.namingAdoption.description.' + project, order.quantity, translation)"/>
    </hint>

    <p
        class="cg-base-text mb-8"
        v-html="$t('default.stepper.namingAdoption.description.company')"
    />

    <v-tabs
        v-if="adoption.type !== null"
        fixed-tabs
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

      <v-tab-item class="adoptions mt-10">

        <v-row v-if="tab === 0">
          <v-col
              cols="12"
              sm="6"
              v-for="n in order.quantity"
              :key="n"
          >
            <adoption-name-block
                v-model="adoption.names[n-1]"
                :n="n"
            />
          </v-col>
        </v-row>

      </v-tab-item>

      <v-tab-item>

        <p class="cg-base-text lower light mt-10 mb-8">
          {{ $t('default.stepper.namingAdoption.tabs.file.upload.description') }}
        </p>

        <div v-if="tab === 1">
          <v-file-input
              v-model="namesFile"
              class="file-import-input"
              :label="$t('default.stepper.namingAdoption.tabs.file.upload.label')"
              outlined
              :rules="[rules.required]"
              accept=".xlsx"
              prepend-inner-icon="mdi-upload"
              :prepend-icon="null"
              @change="updateFile"
          />
        </div>


      </v-tab-item>

    </v-tabs-items>
  </div>
</template>

<script>
import AdoptionNameBlock from "./AdoptionNameBlock.vue";
import {mapActions} from "vuex";
import AdopterEnum from "@/enums/adopterEnum";
import Hint from "@/components/utils/Hint.vue";
import multipleAdoptionMixin from "@/mixins/multipleAdoptionMixin";
import validationMixin from "@/mixins/validationMixin";

export default {
  name: "company-multiple-adoption-block",
  mixins: [multipleAdoptionMixin, validationMixin],
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
    adopterEnum() {
      return AdopterEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    }),
    updateFile(file) {
      this.updateForm({adoption: {file: file}})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
