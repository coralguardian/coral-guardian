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
import SetupForm from "@/forms/full/setupForm";
import FormTypeEnum from "@/enums/formTypeEnum";

const baseStore = new BaseAdoptionFormStore(null, null)

Vue.use(Vuex)

export default class FullFormStore {
  constructor() {
    this.state = {
      ...baseStore.state,
      formType: FormTypeEnum.advanced,
      data: {
        ...baseStore.state.data,
        step: 1,
        adopter: {
          ...baseStore.state.data.adopter,
          alternate_newsletter_email: null,
          send_to_friend: null,
          company_name: "",
          siret: null
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
          message: null,
          toSendOn: null
        },
        forms: []
      },
      products: null,
      startingForm: new SetupForm()
    }

    this.getters = {
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
      getProducts: (state) => state.products.filter(product => product.key === state.data.order.productType)
    }

    this.mutations = {
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
    }

    this.actions = {
      ...baseStore.actions,
      startForm(context) {
        return new Promise((resolve, reject) => {
          context.dispatch('loadForm', context.state.startingForm)
            .then(() => resolve())
            .catch(error => reject(error))
        })
      },
      loadForm(context, form) {
        return new Promise((resolve, reject) => {
          if (!(form instanceof AbstractForm)) {
            reject('Formulaire incomplet')
          } else {
            form.beforeLoad(context)
              .then(() => {
                let steps = checkStepsToDisplay(form, context.state)
                if (steps.length === 0) {
                  form.nextForm(context).then(() => resolve())
                } else {
                  form.steps = steps
                  context.commit("loadSpecificForm", form)
                  resolve()
                }
              })
              .catch(error => {
                reject(error)
              })
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
  }
}
