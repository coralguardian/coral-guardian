import Vue from 'vue';
import Vuex from 'vuex';
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
import AbstractForm from "../forms/abstractForm";
import GiftModel from "../models/giftModel";
import GiftMessageModel from "@/models/giftMessageModel";
import axios from "axios";
import {checkStepsToDisplay} from "@/helpers/functionHelper";
import ActionEnum from "@/enums/actionEnum";
import ProductEnum from "@/enums/productEnum";
import DonationEnum from "@/enums/donationEnum";

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
        type: DonationEnum.monthly
      },
      gift: {
        recipients: [],
        message: "",
        toSendOn: null
      },
      project: null,
      forms: []
    },
    products: null
  },
  getters: {
    ...baseStore.getters,
    getCurrentStep: (state, getters) => {
      return getters.getSteps[state.data.step - 1]
    },
    getStepsNumbers: (state) => {
      if (state.data.forms.length) {
        return state.data.forms.map(form => {
          return form.steps.length
        })
      }
      return []
    },
    getCurrentForm: (state, getters) => {
      let stepsNumbers = getters.getStepsNumbers
      let value = 0;
      for (let i = 0; i < stepsNumbers.length; i++) {
        value += stepsNumbers[i]
        if (value >= state.data.step) {
          return state.data.forms[i]
        }
      }
    },
    getPreviousForm: (state, getters) => {
      let stepsNumbers = getters.getStepsNumbers
      let value = 1;
      for (let i = 0; i < stepsNumbers.length; i++) {
        value += stepsNumbers[i]
        if (value >= state.data.step) {
          return state.data.forms[i]
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
    getGift: state => state.data.gift,
    getGiftModel: state => new GiftModel(state.data),
    getGiftMessageModel: state => new GiftMessageModel(state.data),
    getProject: state => state.data.project,
    getProducts: (state) => state.products.filter(product => product.key === state.data.order.productType)
  },
  mutations: {
    ...baseStore.mutations,
    loadSpecificForm(state, form) {
      state.data.forms.push(form)
      form.onload(state)
    },
    unloadForm(state, formToUnload) {
      formToUnload.unload(state).then(() => {
        state.data.forms = state.data.forms.filter(form => !Object.is(form, formToUnload))
      })
    },
    updateProducts(state, products) {
      state.products = products
    }
  },
  actions: {
    ...baseStore.actions,
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
