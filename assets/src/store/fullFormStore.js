import Vue from 'vue';
import Vuex from 'vuex';
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
import {cloneDeep} from "lodash";
import AdoptionForm from "../forms/full/adoptionForm";
import GiftForm from "../forms/full/giftForm";
import DonationForm from "../forms/full/donationForm";
import SetupForm from "../forms/full/setupForm";
import adoptionHelper from "../helpers/adoptionHelper";
import OrderModel from "../models/orderModel";
import AbstractForm from "../forms/form";
import RecipientFullForm from "../forms/full/recipientFullForm";
import RecipientForm from "../forms/full/recipientForm";
import FinalAdoptionForm from "../forms/full/finalAdoptionForm";
import BankTransferThanksForm from "../forms/full/bankTransferThanksForm";
import GiftModel from "../models/giftModel";

const baseStore = new BaseAdoptionFormStore(null, null, null)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...baseStore.state,
    formType: "advanced",
    data: {
      ...baseStore.state.data,
      step: 1,
      adopter: {
        ...baseStore.state.data.adopter,
        alternate_newsletter_email: null,
        send_to_friend: null,
        company_name: "",
        type: "company"
      },
      order: {
        ...baseStore.state.data.order,
        type: null,
      },
      donation: {
        ...baseStore.state.data.donation,
        type: null
      },
      gift: {
        recipients: [],
        message: "",
        toSendOn: null
      }
    },
    baseForm: new SetupForm(),
    form: new SetupForm()
  },
  getters: {
    ...baseStore.getters,
    getForm: state => state.form.getForm(),
    getCurrentStep: (state, getters) => {
      return getters.getForm.steps[state.data.step - 1]
    },
    getDefaultTranslation: state => {
      let defaultTranslation = 'default.'
      switch (state.data.target) {
        case "donation":
          return defaultTranslation + state.data.donation.type
        default:
          return defaultTranslation + state.data.order.productType + (state.data.order.productType === 'reef' ? ".base" : "")
      }
    },
    getSpecificTranslation: state => state.data.specificType ? 'default.' + state.data.specificType : null,
    getPostPaymentDataAdoption(state) {
      return new OrderModel(state.data)
    },
    getGift: state => state.data.gift,
    getGiftModel(state) {
      return new GiftModel(state.data)
    }
  },
  mutations: {
    ...baseStore.mutations,
    loadSpecificForm(state, form) {
      let stateForm = state.form.getForm()
      let newForm = form.getForm()
      stateForm.tabs = stateForm.tabs.concat(newForm.tabs)
      stateForm.steps = stateForm.steps.concat(newForm.steps)
    },
    resetForm(state) {
      state.form = cloneDeep(state.baseForm)
    },
    loadAdoptionStep(state) {
      const type = state.data.order.productType
      let form = state.form.getForm()
      for (let i = 0; i < form.steps.length; i++) {
        let step = form.steps[i]
        if (step.componentType && step.componentType === "adoption") {
          step.component = type === "coral" ? "CoralAdoptionStep" : "ReefAdoptionStep"
          break
        }
      }
    }
  },
  actions: {
    ...baseStore.actions,
    loadSetupNextSteps(context) {
      return new Promise((resolve, reject) => {
        if (context.state.data.target === null) {
          reject("Aucune action sélectionnée")
        }
        switch (context.state.data.target) {
          case adoptionHelper.me:
            context.dispatch('loadForm', new AdoptionForm())
              .then(() => {context.dispatch('updateForm', {order: {type: 'regular'}, donation: {type: 'recurrent'}})
                  .then(() => resolve())
              });
            break;
          case adoptionHelper.friend:
            context.dispatch('loadForm', new GiftForm())
              .then(() => {context.dispatch('updateForm', {order: {type: 'regular'}, donation: {type: 'recurrent'}})
                  .then(() => resolve())
              })
            break;
          case "donation":
            context.dispatch('loadForm', new DonationForm(context.state.data.donation.project_key))
              .then(() => {context.dispatch('updateForm', {donation: {type: 'unique'}})
                  .then(() => resolve())
              })
            break;
          default:
            reject("Formulaire non trouvé")
        }
      })
    },
    loadAdoptionStep(context) {
      return new Promise((resolve) => {
        context.commit('loadAdoptionStep')
        resolve()
      })
    },
    loadPaymentNextSteps(context) {
      return new Promise((resolve) => {
        if (context.state.data.order.payment_method.type === "bank_transfert") {
          context.dispatch("loadForm", new BankTransferThanksForm())
            .then(() => {
              resolve()
            })
        } else if (context.state.data.target === adoptionHelper.friend) {
          context.dispatch("loadForm", context.state.data.adopter.send_to_friend ? new RecipientFullForm() : new RecipientForm())
            .then(() => {
              resolve()
            })
        } else if (context.state.data.target === adoptionHelper.me) {
          context.dispatch("loadForm", new FinalAdoptionForm())
            .then(() => {
              resolve()
            })
        } else {
          resolve()
        }
      })
    },
    loadForm(context, form) {
      return new Promise((resolve, reject) => {
        if (!(form instanceof AbstractForm)) {
          reject('Formulaire incomplet')
        } else {
          context.commit("loadSpecificForm", form)
          resolve()
        }
      })
    },
    resetForm(context) {
      context.commit("resetForm")
    }
  }
})
