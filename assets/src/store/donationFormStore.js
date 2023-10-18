import Vue from 'vue';
import Vuex from 'vuex';
import BaseFormStore from "@/store/baseFormStore";
import DonationPaymentStep from "@/forms/steps/DonationPaymentStep";
import ProjectEnum from "@/enums/projectEnum";
import AdopterEnum from "@/enums/adopterEnum";

const baseStore = new BaseFormStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...baseStore.state,
    data: {
      ...baseStore.state.data,
      step: 1,
      adopter: {
        ...baseStore.state.data.adopter,
        type: AdopterEnum.individual,
        company_name: "",
        siret: null
      },
      donation: {
        ...baseStore.state.data.donation,
        type: null,
        isCustom: false
      },
      selectedProduct: null,
      project: ProjectEnum.indonesia
    }
  },
  getters: {
    ...baseStore.getters,
    getCurrentStep: () => {
      return new DonationPaymentStep();
    }
  },
  mutations: {
    ...baseStore.mutations
  },
  actions: {
    ...baseStore.actions
  }
})
