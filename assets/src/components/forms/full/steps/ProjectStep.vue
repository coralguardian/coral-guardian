<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isIndonesia"
          @click="updateForm({project: projectConstant.indonesia})"
      >
        <icon icon-path="/img/icons/indonesia.svg" alt=""/>
        <span class="width-tooltip">{{ $t("default.stepper.project.indonesia") }}</span>

        <btn-tooltip>
          <span v-html="$t('default.stepper.project.tooltips.indonesia')"/>
        </btn-tooltip>
      </setup-btn>

      <setup-btn
          v-model="isSpain"
          @click="updateForm({project: projectConstant.spain})"
      >
        <icon icon-path="/img/icons/spain.svg" alt=""/>
        <span class="width-tooltip">{{ $t("default.stepper.project.spain") }}</span>

        <btn-tooltip>
          <span v-html="$t('default.stepper.project.tooltips.spain')"/>
        </btn-tooltip>
      </setup-btn>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BtnTooltip from "../../../utils/BtnTooltip";
import SetupBtn from "../SetupBtn";
import Icon from "@/components/utils/Icon.vue";
import validationMixin from "@/mixins/validationMixin";
import ProjectEnum from "@/enums/projectEnum";

export default {
  name: "project-step",
  mixins: [validationMixin],
  components: {
    BtnTooltip,
    SetupBtn,
    Icon
  },
  computed: {
    ...mapGetters({
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
    })
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => {
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
</style>
