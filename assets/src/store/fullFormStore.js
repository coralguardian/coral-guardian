import Vue from 'vue';
import Vuex from 'vuex';
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
import adoptionHelper from "../helpers/adoptionHelper";
import AbstractForm from "../forms/abstractForm";
import RecipientFullForm from "../forms/full/recipientFullForm";
import FinalAdoptionForm from "../forms/full/finalAdoptionForm";
import BankTransferThanksForm from "../forms/full/bankTransferThanksForm";
import GiftModel from "../models/giftModel";
import AdoptionModel from "@/models/adoptionModel";
import FinalGiftForm from "@/forms/full/finalGiftForm";
import GiftMessageModel from "@/models/giftMessageModel";
import axios from "axios";
import {checkStepsToDisplay} from "@/helpers/functionHelper";
import ActionEnum from "@/enums/actionEnum";
import ProductEnum from "@/enums/productEnum";

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
        company_name: ""
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
      },
      project: null
    },
    forms: [],
    products: null
  },
  getters: {
    ...baseStore.getters,
    getCurrentStep: (state, getters) => {
      return getters.getSteps[state.data.step - 1]
    },
    getStepsNumbers: (state) => state.forms.map(form => form.getSteps().length),
    getCurrentForm: (state, getters) => {
      let stepsNumbers = getters.getStepsNumbers
      let value = 0;
      for (let i = 0; i < stepsNumbers.length; i++) {
        value += stepsNumbers[i]
        if (value >= state.data.step) {
          return state.forms[i]
        }
      }
    },
    getPreviousForm: (state, getters) => {
      let stepsNumbers = getters.getStepsNumbers
      let value = 1;
      for (let i = 0; i < stepsNumbers.length; i++) {
        value += stepsNumbers[i]
        if (value >= state.data.step) {
          return state.forms[i]
        }
      }
    },
    getDefaultTranslation: state => {
      let defaultTranslation = 'default.'
      switch (state.data.target) {
        case ActionEnum.donation:
          return defaultTranslation + state.data.donation.type
        default:
          return defaultTranslation + state.data.order.productType + (state.data.order.productType === ProductEnum.reef ? ".base" : "")
      }
    },
    getSpecificTranslation: state => state.data.specificType ? 'default.' + state.data.specificType : null,
    getPostPaymentDataAdoption: state => new AdoptionModel(state.data),
    getGift: state => state.data.gift,
    getGiftModel: state => new GiftModel(state.data),
    getGiftMessageModel: state => new GiftMessageModel(state.data),
    getProject: state => state.data.project,
    getProducts: (state) => state.data.products.filter(product => product.key === state.data.order.productType)
  },
  mutations: {
    ...baseStore.mutations,
    loadSpecificForm(state, form) {
      state.forms.push(form)
      form.onload(state)
    },
    unloadForm(state, formToUnload) {
      formToUnload.unload(state).then(() => {
        state.forms = state.forms.filter(form => !Object.is(form, formToUnload))
      })
    },
    updateProducts(state, products) {
      state.data.products = products
    }
  },
  actions: {
    ...baseStore.actions,
    loadPaymentNextSteps(context) {
      return new Promise((resolve) => {
        if (context.state.data.order.payment_method.type === "bank_transfert") {
          context.dispatch("loadForm", new BankTransferThanksForm())
            .then(() => {
              resolve()
            })
        } else if (context.state.data.target === adoptionHelper.friend) {
          context.dispatch("loadForm", context.state.data.adopter.send_to_friend ? new RecipientFullForm() : new FinalGiftForm())
            .then(() => {
              resolve()
            })
            .catch((err) => console.log(err))
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
          let steps = checkStepsToDisplay(form, context.state)
          if (steps.length === 0 && form !== null) {
            form.nextForm(context).then(() => resolve())
          } else if (form === null) {
            throw "Form should not be null"
          } else {
            form.steps = steps
            context.commit("loadSpecificForm", form)
            resolve()
          }
        }
      })
    },
    loadProducts(context) {
      return new Promise((resolve, reject) => {
        if (context.state.data.project === null) {
          reject("Un projet doit être sélectionné !")
        }
        axios.get("/wp-json/" + context.getters.getApiNamespace + "/adoption/products?project=" + context.getters.getProject)
          .then(resp => {
            context.commit("updateProducts", resp.data)
            const uniqueTypes = [...new Set(resp.data.map(product => product.key))];
            if (uniqueTypes.length === 1) {
              context.dispatch("updateForm", {order: {productType: uniqueTypes.join()}}).then(() => resolve())
            } else {
              resolve()
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
