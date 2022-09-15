import Vue from 'vue';
import Vuex from 'vuex';
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
import {cloneDeep} from "lodash";
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
import EmptyForm from "@/forms/full/emptyForm";
import ActionEnum from "@/enums/actionEnum";

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
    baseForm: new EmptyForm(),
    form: new EmptyForm(),
    products: null
  },
  getters: {
    ...baseStore.getters,
    getForm: state => state.form,
    getCurrentStep: (state, getters) => {
      return getters.getForm.steps[state.data.step - 1]
    },
    getDefaultTranslation: state => {
      let defaultTranslation = 'default.'
      switch (state.data.target) {
        case ActionEnum.donation:
          return defaultTranslation + state.data.donation.type
        default:
          return defaultTranslation + state.data.order.productType + (state.data.order.productType === 'reef' ? ".base" : "")
      }
    },
    getSpecificTranslation: state => state.data.specificType ? 'default.' + state.data.specificType : null,
    getPostPaymentDataAdoption: state => new AdoptionModel(state.data),
    getGift: state => state.data.gift,
    getGiftModel: state => new GiftModel(state.data),
    getGiftMessageModel: state => new GiftMessageModel(state.data),
    getProject: state => state.data.project
  },
  mutations: {
    ...baseStore.mutations,
    loadSpecificForm(state, form) {
      let stateSteps = state.form.getSteps()
      let steps = checkStepsToDisplay(form, state)
      form.steps = stateSteps.concat(steps)
      state.form = form
      if (state.baseForm instanceof EmptyForm) {
        state.baseForm = form
      }
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
    },
    updateProducts(state, products) {
      state.data.products = products
    }
  },
  actions: {
    ...baseStore.actions,
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
          context.commit("loadSpecificForm", form)
          resolve()
        }
      })
    },
    resetForm(context) {
      context.commit("resetForm")
    },
    loadProducts(context) {
      return new Promise((resolve, reject) => {
        if (context.state.data.project === null) {
          reject("Un projet doit être sélectionné !")
        }
        axios.get("/wp-json/" + context.getters.getApiNamespace + "/adoption/products?project=" + context.getters.getProject)
          .then(resp => {
            context.commit("updateProducts", resp.data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
