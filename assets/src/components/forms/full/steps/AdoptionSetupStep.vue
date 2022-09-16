<template>
  <div>
    <div class="d-flex justify-space-around btn-container">
      <setup-btn
          v-model="isCoral"
          @click="updateForm({order: {productType: productEnum.coral}})"
      >
        <img class="form-icon" :src="path + '/img/icons/corail.svg'" alt="">
        {{$tc('default.coral', 1)}}
      </setup-btn>
      <setup-btn
          v-model="isReef"
          @click="updateForm({order: {productType: productEnum.reef}})"
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
import ProductEnum from "@/enums/productEnum";

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
    productEnum() {
      return ProductEnum
    },
    isCoral() {
      return this.order.productType === "coral"
    },
    isReef() {
      return this.order.productType === "reef"
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => {
      if (this.isCoral || this.isReef) {
          this.$root.$emit('StepValid')
          this.$root.$emit('IsLoaded')
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
    height: 140px;
  }
}
</style>