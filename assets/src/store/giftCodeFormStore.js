import Vue from 'vue';
import Vuex from 'vuex';
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
import GiftCodeForm from "../forms/giftCodeForm";
import AdopteeDepositModel from "@/models/adopteeDepositModel";

const form = new BaseAdoptionFormStore(null, null)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...form.state,
    form: new GiftCodeForm()
  },
  getters: {
    ...form.getters,
    getForm: state => state.form.form,
    getSteps: state => {
      return state.form.form.steps
    },
    getDefaultTranslation: state => {
      let defaultTranslation = 'default.'
      return defaultTranslation + state.data.order.productType + (state.data.order.productType === 'reef' ? ".base" : "")
    },
    getSpecificTranslation: state => state.data.specificType ? 'default.' + state.data.specificType : null,
    getAdopteeDepositModel: (state) => {
      return new AdopteeDepositModel(state.data)
    }
  },
  mutations: {
    ...form.mutations
  },
  actions: {
    ...form.actions
  }
})
