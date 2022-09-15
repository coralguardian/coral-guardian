<template>
  <div>
    <div class="d-flex justify-space-between btn-container">
      <setup-btn
          v-model="isIndividual"
          @click="updateForm({adopter: {type: adopterType.individual}})"
      >
        {{$t("default.stepper.adopterType.individual")}}
      </setup-btn>

      <setup-btn
          v-model="isCompany"
          @click="updateForm({adopter: {type: adopterType.company}})"
      >
        {{$t("default.stepper.adopterType.company")}}
      </setup-btn>

    </div>
    <div v-if="isIndividual || isCompany" class="text-right mt-5">
      <v-btn color="secondary black--text" @click="incrementStep">
        Continuer
      </v-btn>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SetupBtn from "../SetupBtn";
import AdopterEnum from "@/enums/adopterEnum";

export default {
  name: "adopter-type-step",
  components: {
    SetupBtn
  },
  computed: {
    ...mapGetters({
      adopter: "getAdopter"
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
      updateForm: "updateForm",
      resetForm: "resetForm",
      incrementStep: "incrementStep"
    })
  },
  mounted() {
    this.resetForm()
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