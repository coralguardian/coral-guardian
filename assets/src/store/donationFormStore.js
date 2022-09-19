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
          title: "default.stepper.donation.title." + form.state.data.project,
          component: "DonationStep",
          validate: true
        },
        {
          title: "default.stepper.information.title",
          component: "InformationStep",
          validate: true,
          api: {
            method: "post",
            endpoint: "customer"
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
            endpoint: "donate"
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
    getDonation: state => state.data.donation
  },
  mutations: {
    ...form.mutations
  },
  actions: {
    ...form.actions
  }
})
