<template>
  <div class="btn-container">
    <setup-btn
        v-model="isIndividual"
        @click="updateForm({adopter: {type: adopterType.individual}})"
    >
      <icon icon-path="'img/icons/individual.svg'" alt=""/>
      {{ $t("default.stepper.adopterType.individual") }}
    </setup-btn>

    <setup-btn
        v-model="isCompany"
        @click="updateForm({adopter: {type: adopterType.company}})"
    >
      <icon icon-path="'img/icons/company.svg'" alt=""/>
      {{ $t("default.stepper.adopterType.company") }}
    </setup-btn>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SetupBtn from "../SetupBtn";
import AdopterEnum from "@/enums/adopterEnum";
import validationMixin from "@/mixins/validationMixin";
import Icon from "@/components/utils/Icon.vue";

export default {
  name: "adopter-type-step",
  mixins: [validationMixin],
  components: {
    Icon,
    SetupBtn
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
    }),
    adopterType() {
      return AdopterEnum
    },
    isIndividual() {
      return this.adopter.type === this.adopterType.individual
    },
    isCompany() {
      return this.adopter.type === this.adopterType.company
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => {
      if (this.adopter.type !== null) {
        this.$root.$emit('StepValid')
        this.displayErrorMessage = false
      } else {
        this.$root.$emit(this.validationErrorEventName)
        this.$root.$emit('IsLoaded')
        this.displayErrorMessage = true
      }
    })
  },
  beforeDestroy() {
    this.$root.$off(this.customValidationEventName)
  }
}
</script>

<style lang="scss" scoped>
</style>
