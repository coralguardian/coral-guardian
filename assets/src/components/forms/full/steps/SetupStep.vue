<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isAdoptionForMe"
          @click="updateForm({target: adoptionConstants.me, order: {type: 'regular'}})"
      >
        <icon icon-path="'img/icons/corail.svg'" alt=""/>
        {{ $t("default.stepper.setup.adopt") }}

        <btn-tooltip>
          <span>{{ $t('default.stepper.setup.tooltips.me') }}</span>
        </btn-tooltip>
      </setup-btn>

      <setup-btn
          v-model="isAdoptionToOffer"
          @click="updateForm({target: adoptionConstants.friend, order: {type: 'gift'}})"
      >
        <icon icon-path="'img/icons/gift.svg'" alt=""/>
        {{ $t("default.stepper.setup.offer") }}

        <btn-tooltip>
          <span>{{ $t('default.stepper.setup.tooltips.recipient') }}</span>
        </btn-tooltip>

      </setup-btn>

      <div v-if="adopter.type === adopterEnum.company" class="switch-link-container">
        <a class="cg-base-text switch-link"
           href="https://www.coralguardian.org/faire-un-don/?action=donation&c=company">
          {{ $t("default.stepper.setup.switch.donation") }}
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </a>
        <a class="cg-base-text switch-link" href="https://www.coralguardian.org/adopte-corail/?c=individual">
          {{ $t("default.stepper.setup.switch.individual") }}
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </a>
      </div>
      <div v-else class="switch-link-container">
        <a class="cg-base-text switch-link"
           href="https://www.coralguardian.org/faire-un-don/?action=donation&c=individual">
          {{ $t("default.stepper.setup.switch.donation") }}
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </a>
        <a class="cg-base-text switch-link" href="https://www.coralguardian.org/nous-soutenir/?c=company">
          {{ $t("default.stepper.setup.switch.company") }}
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
        </a>
      </div>

      <!--      <setup-btn-->
      <!--          v-model="isDonation"-->
      <!--          @click="updateForm({target: 'donation'})"-->
      <!--      >-->
      <!--        <icon icon-path="'img/icons/don.svg'" alt=""/>-->
      <!--        {{ $t("default.stepper.setup.donation") }}-->

      <!--        <btn-tooltip>-->
      <!--          <div class="text-center">-->
      <!--            <span>{{ $t('default.stepper.setup.tooltips.donation') }}</span>-->
      <!--          </div>-->
      <!--        </btn-tooltip>-->
      <!--      </setup-btn>-->
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import adoptionMixin from "../../../../mixins/adoptionMixin";
import BtnTooltip from "../../../utils/BtnTooltip";
import SetupBtn from "../SetupBtn";
import validationMixin from "@/mixins/validationMixin";
// import ActionEnum from "@/enums/actionEnum";
import ProjectEnum from "@/enums/projectEnum";
import Icon from "@/components/utils/Icon.vue";
import AdopterEnum from "@/enums/adopterEnum";

export default {
  name: "setup-step",
  mixins: [adoptionMixin, validationMixin],
  components: {
    Icon,
    BtnTooltip,
    SetupBtn
  },
  computed: {
    ...mapGetters({
      target: "getTarget",
      project: "getProject",
      adopter: 'getAdopter'
    }),
    isAdoptionForMe() {
      return this.target === this.adoptionConstants.me
    },
    isAdoptionToOffer() {
      return this.target === this.adoptionConstants.friend
    },
    // isDonation() {
    //   return this.target === ActionEnum.donation
    // },
    projectEnum() {
      return ProjectEnum
    },
    adopterEnum() {
      return AdopterEnum
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm"
    })
  },
  mounted() {
    this.$root.$on(this.customValidationEventName, () => {
      if (this.target !== null) {
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
    height: 200px;
  }
}

.switch-link-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;

  .switch-link {
    font-size: 16px;
    line-height: 24px;
    color: $primary !important;
    text-decoration: none;
  }
}
</style>
