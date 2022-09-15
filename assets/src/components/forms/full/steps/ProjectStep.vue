<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isIndonesia"
          @click="updateForm({project: projectConstant.indonesia})"
      >
        <img class="form-icon" :src="path + 'img/icons/indonesia.svg'" alt="">
        {{ $t("default.stepper.project.indonesia") }}

        <btn-tooltip>
          <div class="text-left">
            <span v-html="$t('default.stepper.project.tooltips.indonesia')"/>
          </div>
        </btn-tooltip>
      </setup-btn>

      <setup-btn
          v-model="isSpain"
          @click="updateForm({project: projectConstant.spain})"
      >
        <img class="form-icon" :src="path + 'img/icons/spain.svg'" alt="">
        {{ $t("default.stepper.project.spain") }}

        <btn-tooltip>
          <div class="text-left">
            <span v-html="$t('default.stepper.project.tooltips.spain')"/>
          </div>
        </btn-tooltip>
      </setup-btn>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BtnTooltip from "../../../utils/BtnTooltip";
import SetupBtn from "../SetupBtn";
import validationMixin from "@/mixins/validationMixin";
import ProjectEnum from "@/enums/projectEnum";

export default {
  name: "project-step",
  mixins: [validationMixin],
  components: {
    BtnTooltip,
    SetupBtn
  },
  computed: {
    ...mapGetters({
      path: "getImgPath",
      project: "getProject"
    }),
    projectConstant() {
      return ProjectEnum
    },
    isIndonesia() {
      return this.project === ProjectEnum.indonesia
    },
    isSpain() {
      return this.project === ProjectEnum.spain
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      resetForm: "resetForm"
    })
  },
  mounted() {
    this.resetForm()
    this.$root.$on(this.customValidationEventName, () => {
      console.log("cocuo")
      if (this.project !== null) {
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