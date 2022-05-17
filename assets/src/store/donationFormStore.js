import Vue from 'vue'
import Vuex from 'vuex'
import BaseFormStore from "@/store/baseFormStore";

const form = new BaseFormStore()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...form.state,
    data: {
      ...form.state.data
    },
    form: {
      tabs: [
        {
          visible: true,
          title: "default.stepper.header.donation",
          class: 'round-left-top'
        },
        {
          visible: true,
          title: "default.stepper.header.information"
        },
        {
          visible: true,
          title: "default.stepper.header.payment",
          class: 'round-right-top'
        },
        {
          visible: false,
          title: null
        }
      ],
      steps: [
        {
          title: "default.stepper.donation.title." + form.state.data.donation.project_key,
          component: "DonationStep",
          validate: true
        },
        {
          title: "default.stepper.information.title",
          component: "InformationStep",
          validate: true,
          api: {
            method: "post",
            endpoint: "createCustomer"
          },
        },
        {
          title: "default.stepper.payment.title",
          component: "PaymentStep",
          validate: true,
          customValidation: true,
          props: {
            mode: 'donation'
          },
          api: {
            method: "post",
            endpoint: "createDonation"
          }
        },
        {
          title: "default.stepper.finalDonation.title",
          component: "FinalDonationStep",
          back: false,
          api: {
            endpoint: "getCertificates"
          }
        }
      ]
    }
  },
  getters: {
    ...form.getters,
    getDefaultTranslation: state => "default." + state.data.donation.type,
    getForm: state => state.form,
    getDonation: state => state.data.donation,
    // getApiData: (state, getters) => {
    //   return getters.getCurrentStep.api ? {
    //     method: getters.getCurrentStep.api.method,
    //     endpoint: "gifts/" + state.data.donation.type + "/" + getters.getCurrentStep.api.endpoint,
    //     confirmEndpoint: "gifts/" + state.data.donation.type + "/" + getters.getCurrentStep.api.confirmEndpoint
    //   } : null;
    // }
  },
  mutations: {
    ...form.mutations
  },
  actions: {
    ...form.actions
  }
})
