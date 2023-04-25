<template>
  <div id="namingAdoption">
    <div class="adoptions">
      <hint>
        <p class="cg-base-text"
           v-html="$tc('default.stepper.namingAdoption.description.' + project, order.quantity, translation)"/>
      </hint>
      <v-form
          v-if="adoption.type !== null"
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
    </div>

    <div>
      <v-checkbox class="mt-0" :input-value="adoption.type === null" @change="updateAdoptionType($event)">
        <template v-slot:label>
          <p class="cg-base-text" v-html="$t('default.stepper.namingAdoption.no_idea.' + adopter.type)"/>
        </template>
      </v-checkbox>
    </div>

  </div>
</template>

<script>
import AdoptionNameBlock from "../../blocks/AdoptionNameBlock";
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../../mixins/validationMixin";
import itemTranslationMixin from "../../../../mixins/itemTranslationMixin";
import AdopterEnum from "@/enums/adopterEnum";
import Hint from "@/components/utils/Hint.vue";
import DepositTypeEnum from "@/enums/depositTypeEnum";

export default {
  name: "naming-adoption-step",
  mixins: [validationMixin, itemTranslationMixin],
  components: {
    Hint,
    AdoptionNameBlock
  },
  data() {
    return {
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
        if (this.adoption.type === DepositTypeEnum.fields) {
          this.$root.$emit(this.validationEventName)
        }
      }
    },
    updateAdoptionType(value) {
      if (value === false) {
        this.valid = false
        this.updateForm({adoption: {type: DepositTypeEnum.fields}})
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
}
</style>
