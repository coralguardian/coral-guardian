import Vue from 'vue';
import Vuex from 'vuex';
import FullFormStore from "@/store/fullFormStore";
import DepositForm from "@/forms/full/depositForm";
import GiftOrderModel from "@/models/giftOrderModel";
import FormTypeEnum from "@/enums/formTypeEnum";
import RecipientDepositFileModel from "@/models/recipientDepositFileModel";
import RecipientDepositModel from "@/models/recipientDepositModel";
import AdopteeDepositModel from "@/models/adopteeDepositModel";

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
    getRecipientDepositFileModel: (state) => {
      return new RecipientDepositFileModel(state.data)
    },
    getRecipientDepositModel: (state) => {
      return new RecipientDepositModel(state.data)
    },
    getAdopteeDepositModel: (state) => {
      return new AdopteeDepositModel(state.data)
    }
  },
  mutations: {
    ...fullFormStore.mutations
  },
  actions: {
    ...fullFormStore.actions
  }
})
