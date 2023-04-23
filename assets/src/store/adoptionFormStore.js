import Vue from 'vue';
import Vuex from 'vuex';
import FullFormStore from "@/store/fullFormStore";

const fullFormStore = new FullFormStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...fullFormStore.state,
  },
  getters: {
    ...fullFormStore.getters,
  },
  mutations: {
    ...fullFormStore.mutations
  },
  actions: {
    ...fullFormStore.actions
  }
})
