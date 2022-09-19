import {concat, merge} from "lodash";
import DonationModel from "../models/donationModel";
import CustomerModel from "@/models/customerModel";
import OrderModel from "@/models/orderModel";
import DonationEnum from "@/enums/donationEnum";

// public path is from wp, used to set full images path
/* global publicPath */
let basePath = (typeof publicPath !== "undefined") && (publicPath !== null) ? publicPath[0] : ""
/* global apiNamespace */
let apiPath = (typeof apiNamespace !== "undefined") && (apiNamespace !== null) ? apiNamespace[0] : ""

export default class BaseFormStore {
  constructor() {
    this.state = {
      formType: "basic",
      baseImgPath: basePath,
      apiNamespace: apiPath,
      data: {
        step: 0,
        baseElementPrice: null,
        adopter: {
          id: null,
          type: null,
          first_name: "",
          last_name: "",
          email: "",
          address: "",
          postal_code: null,
          city: "",
          country: null,
          wants_newsletter: false
        },
        order: {
          id: null,
          uuid: null,
          type: "regular",
          clientSecret: null,
          price: null,
          customAmount: false,
          quantity: 1,
          payment_method: {
            type: 'credit_card'
          },
          status: null
        },
        orderToken: "",
        donation: {
          type: DonationEnum.monthly,
          price: 0,
          payment_method: {
            type: "credit_card"
          },
          status: null
        }
      }
    }

    this.getters = {
      getSteps: state => {
        let steps = []
        state.data.forms.forEach(form => {
          steps = concat(steps, form.steps)
        })
        return steps
      },
      step: state => state.data.step,
      getCurrentStep: (state, getters) => getters.getSteps[state.data.step],
      stepCount: (state, getters) => getters.getSteps.length,
      getApiData: (state, getters) => getters.getCurrentStep.api ? getters.getCurrentStep.api : null,
      getOrderToken: state => state.data.orderToken,
      getPostPaymentDataDonation: state => new DonationModel(state.data),
      getAdopter: state => state.data.adopter,
      getCustomerModel: state => new CustomerModel(state.data),
      getOrder: state => state.data.order,
      getImgPath: state => state.baseImgPath,
      getDonation: state => state.data.donation,
      getFormType: state => state.formType,
      getApiNamespace: state => state.apiNamespace,
      getOrderModel: (state) => new OrderModel(state.data)
    };

    this.mutations = {
      updateForm(state, data) {
        // console.log(data)
        // state.data = data
        merge(state.data, data)
      },
      forceUpdate(state, data) {
        // console.log(data)
        state.data = data
        // merge(state.data, data)
      },
      incrementStep(state) {
        state.data.step++
      },
      decrementStep(state) {
        state.data.step--
      }
    };

    this.actions = {
      forceUpdate(context, data) {
        return new Promise((resolve) => {
          context.commit('forceUpdate', data)
          resolve()
        })
      },
      updateForm(context, data) {
        return new Promise((resolve) => {
          context.commit('updateForm', data)
          resolve()
        })
      },
      incrementStep(context) {
        return new Promise(resolve => {
          if (context.state.data.step === context.getters.getSteps.length) {
            context.dispatch("loadNextForm")
              .then(() => {
                context.commit('incrementStep')
                resolve()
              })
          } else {
            context.commit('incrementStep')
            resolve()
          }
        })
      },
      decrementStep(context) {
        if (context.state.data.step > 0) {
          let formToUnload = null;
          if (!Object.is(context.getters.getCurrentForm, context.getters.getPreviousForm)) {
            formToUnload = context.getters.getCurrentForm
          }
          context.commit('decrementStep')
          if (formToUnload !== null) {
            context.commit('unloadForm', formToUnload)
          }
        }
      },
      redirectToPaymentStep(context, data) {
        return new Promise((resolve) => {
          const dataObject = JSON.parse(data)
          context.dispatch("updateForm", dataObject).then(() => {
            resolve()
          })
        })
      },
      loadNextForm(context) {
        return new Promise(resolve => {
          context.getters.getCurrentForm.nextForm(context).then(() => resolve())
        })
      }
    }
  }
}
