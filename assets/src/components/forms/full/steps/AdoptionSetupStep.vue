<template>
  <div>
    <div class="d-flex justify-space-around">
      <setup-btn
          v-model="isCoral"
          @click="updateForm({order: {productType: 'coral', price: 30}, baseElementPrice: 30})"
      >
        <img class="form-icon" :src="path + '/img/icons/corail.svg'" alt="">
        {{$tc('default.coral', 1)}}
      </setup-btn>
      <setup-btn
          v-model="isReef"
          @click="updateForm({specificType: 'reef.lady', order: {productType: 'reef', price: 900}, baseElementPrice: 900})"
      >
        <img class="form-icon" :src="path + '/img/icons/recif.svg'" alt="">
        {{$tc('default.reef.base', 1)}}

        <btn-tooltip>
          <div class="text-center">
            <span v-html="$t('default.reef.tooltip')"/>
          </div>
        </btn-tooltip>
      </setup-btn>
    </div>

    <p v-if="displayErrorMessage" class="error--text">
      {{ $t('default.stepper.adoptionSetup.error') }}
    </p>

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import validationMixin from "../../../../mixins/validationMixin";
import BtnTooltip from "../../../utils/BtnTooltip";
import SetupBtn from "../SetupBtn";

export default {
  name: "adoption-setup-step",
  mixins: [validationMixin],
  components: {
    BtnTooltip,
    SetupBtn
  },
  data() {
    return {
      displayErrorMessage: false
    }
  },
  computed: {
    ...mapGetters({
      order: "getOrder",
      path: "getImgPath"
    }),
    isCoral() {
      return this.order.productType === "coral"
    },
    isReef() {
      return this.order.productType === "reef"
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      loadAdoptionStep: "loadAdoptionStep"
    })
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => {
      if (this.isCoral || this.isReef) {
        this.loadAdoptionStep().then(() => {
          this.$root.$emit('StepValid')
          this.$root.$emit('IsLoaded')
          this.displayErrorMessage = false
        })
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

<style scoped>

</style>