<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isIndividual"
          @click="updateForm({adopter: {type: adopterType.individual}})"
      >
        <img class="form-icon" :src="path + 'img/icons/individual.svg'" alt="">
        {{$t("default.stepper.adopterType.individual")}}
      </setup-btn>

      <setup-btn
          v-model="isCompany"
          @click="updateForm({adopter: {type: adopterType.company}})"
      >
        <img class="form-icon" :src="path + 'img/icons/company.svg'" alt="">
        {{$t("default.stepper.adopterType.company")}}
      </setup-btn>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SetupBtn from "../SetupBtn";
import AdopterEnum from "@/enums/adopterEnum";
import validationMixin from "@/mixins/validationMixin";

export default {
  name: "adopter-type-step",
  mixins: [validationMixin],
  components: {
    SetupBtn
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter",
      path: "getImgPath"
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
.btn-container {
  @media (max-width: 450px) {
    height: 135px;
  }
}
</style>