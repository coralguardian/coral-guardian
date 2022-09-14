import {merge} from "lodash";
import fiscalHelper from "@/helpers/fiscalHelper";
import DonationModel from "../models/donationModel";
import CustomerModel from "@/models/customerModel";
import DonationHelper from "@/helpers/donationHelper";
import donationHelper from "@/helpers/donationHelper";

// public path is from wp, used to set full images path
/* global publicPath */
let basePath = (typeof publicPath !== "undefined") && (publicPath !== null) ? publicPath[0] : ""
/* global apiNamespace */
let apiPath = (typeof apiNamespace !== "undefined") && (apiNamespace !== null) ? apiNamespace[0] : ""
// const qparams = new URLSearchParams(window.location.search)
// const project = qparams.has('prt') ? qparams.get('prt') : 'france'

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
          type: donationHelper.monthly,
          price: 0,
          payment_method: {
            type: "credit_card"
          },
          status: null
        }
      },
      baseForm: {
        steps: [
          {
            tab: {
              visible: false,
              title: null
            },
            title: "",
            component: null,
            singularTitle: true,
            classes: null
          }
        ]
      },
    }

    this.getters = {
      getForm(state) {
        console.error("implement this method")
        return state.baseForm
      },
      step: state => state.data.step,
      getCurrentStep: (state, getters) => {
        return getters.getForm.steps[state.data.step]
      },
      stepCount: (state, getters) => getters.getForm.steps.length,
      getDefaultTranslation: state => "default." + state.data.order.productType,
      getPaymentData: state => {
        return {
          customAmount: state.data.customAmount,
          donationAmount: state.data.donationAmount
        }
      },
      // getDonationAmount: state => state.data.donationAmount,
      // getDonationType: state => state.data.donationType,
      hasDonationTypeSetByShortcode: state => state.data.isDonationTypeSetByShortcode,
      getApiData: (state, getters) => {
        return getters.getCurrentStep.api ? getters.getCurrentStep.api : null;
      },
      getOrderToken: state => state.data.orderToken,
      getBillingDetails: state => {
        const adopter = state.data.adopter
        return {
          address: {
            city: adopter.city,
            line1: adopter.address,
            postal_code: adopter.postal_code
          },
          name: adopter.first_name + " " + adopter.last_name,
          email: adopter.email
        }
      },
      getPostPaymentDataDonation: state => new DonationModel(state.data),
      getFiscalReduction(state) {
        const fiscalReduction = fiscalHelper[state.data.adopter.type]
        if (!fiscalReduction) {
          alert("Cette réduction fiscale n'existe pas.")
          return;
        }
        return fiscalReduction;
      },
      getAdopter: state => state.data.adopter,
      getCustomerModel: state => new CustomerModel(state.data),
      getOrder: state => state.data.order,
      getImgPath: state => state.baseImgPath,
      getDonation: state => state.data.donation,
      getFormType: state => state.formType,
      getApiNamespace: state => state.apiNamespace,
      getDonationEnum: () => DonationHelper
    };

    this.mutations = {
      updateForm(state, data) {
        merge(state.data, data)
      },
      incrementStep(state) {
        state.data.step++
      },
      decrementStep(state) {
        state.data.step--
      }
    };

    this.actions = {
      updateForm(context, data) {
        return new Promise((resolve) => {
          context.commit('updateForm', data)
          resolve()
        })
      },
      incrementStep(context) {
        context.commit('incrementStep')
      },
      decrementStep(context) {
        if (context.state.data.step > 0) {
          context.commit('decrementStep')
        }
      },
      redirectToPaymentStep(context, data) {
        return new Promise((resolve) => {
          const dataObject = JSON.parse(data)
          context.dispatch("updateForm", dataObject).then(() => {
            resolve()
          })
        })
      }
    }
  }
}
