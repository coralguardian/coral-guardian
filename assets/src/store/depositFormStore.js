import Vue from 'vue';
import Vuex from 'vuex';
import FullFormStore from "@/store/fullFormStore";
import DepositForm from "@/forms/full/depositForm";

const fullFormStore = new FullFormStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...fullFormStore.state,
    startingForm: new DepositForm()
  },
  getters: {
    ...fullFormStore.getters
  },
  mutations: {
    ...fullFormStore.mutations
  },
  actions: {
    ...fullFormStore.actions
  }
})
