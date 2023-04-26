import Vue from 'vue';
import Vuex from 'vuex';
import FullFormStore from "@/store/fullFormStore";
import DepositForm from "@/forms/full/depositForm";
import GiftOrderModel from "@/models/giftOrderModel";
import FormTypeEnum from "@/enums/formTypeEnum";

const fullFormStore = new FullFormStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...fullFormStore.state,
    formType: FormTypeEnum.deposit,
    data: {
      ...fullFormStore.state.data,
      gift: {
        ...fullFormStore.state.data.gift,
        file: null
      },
      adoption: {
        ...fullFormStore.state.data.adoption,
        file: null
      }
    },
    startingForm: new DepositForm()
  },
  getters: {
    ...fullFormStore.getters,
    getGiftOrderModel: (state) => {
      return new GiftOrderModel(state.data)
    },
  },
  mutations: {
    ...fullFormStore.mutations
  },
  actions: {
    ...fullFormStore.actions
  }
})
