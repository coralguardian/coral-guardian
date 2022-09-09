<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isAdoptionForMe"
          @click="updateForm({target: adoptionConstants.me, order: {type: 'regular'}})"
      >
        <img class="form-icon" :src="path + '/img/icons/certificat.svg'" alt="">
        {{$t("default.stepper.setup.adopt")}}

        <btn-tooltip>
          <div class="text-center">
            <span>{{ $t('default.stepper.setup.tooltips.me') }}</span>
          </div>
        </btn-tooltip>
      </setup-btn>

      <setup-btn
          v-model="isAdoptionToOffer"
          @click="updateForm({target: adoptionConstants.friend, order: {type: 'gift'}})"
      >
        <img class="form-icon" :src="path + '/img/icons/joffre.svg'" alt="">
        {{$t("default.stepper.setup.offer")}}

        <btn-tooltip>
          <div class="text-center">
            <span>{{ $t('default.stepper.setup.tooltips.recipient') }}</span>
          </div>
        </btn-tooltip>

      </setup-btn>

      <setup-btn
          v-model="isDonation"
          @click="updateForm({target: 'donation'})"
      >
        <img class="form-icon" :src="path + '/img/icons/don.svg'" alt="">
        {{$t("default.stepper.setup.donation")}}
      </setup-btn>
    </div>
    <div v-if="isAdoptionForMe || isAdoptionToOffer || isDonation" class="text-right mt-5">
      <v-btn color="secondary black--text" @click="loadForm">
        Continuer
      </v-btn>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import adoptionMixin from "../../../../mixins/adoptionMixin";
import BtnTooltip from "../../../utils/BtnTooltip";
import SetupBtn from "../SetupBtn";

export default {
  name: "setup-step",
  mixins: [adoptionMixin],
  components: {
    BtnTooltip,
    SetupBtn
  },
  computed: {
    ...mapGetters({
      target: "getTarget",
      path: "getImgPath"
    }),
    isAdoptionForMe() {
      return this.target === this.adoptionConstants.me
    },
    isAdoptionToOffer() {
      return this.target === this.adoptionConstants.friend
    },
    isDonation() {
      return this.target === "donation"
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      loadSetupNextSteps: "loadSetupNextSteps",
      resetForm: "resetForm",
      incrementStep: "incrementStep"
    }),
    loadForm() {
      this.loadSetupNextSteps().then(() => this.incrementStep())
    }
  },
  mounted() {
    this.resetForm()
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  @media (max-width: 450px) {
    height: 200px;
  }
}
</style>