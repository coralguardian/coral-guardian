import Vue from 'vue'
import App from "./App";
import DonationForm from "@/DonationForm";
import FullForm from "./FullForm";
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import coralFormStore from "./store/coralFormStore";
import reefFormStore from "./store/reefFormStore";
import donationFormStore from "./store/donationFormStore";
import fullFormStore from "./store/fullFormStore";
import giftFormStore from "./store/giftCodeFormStore";
import './styles/styles.scss'

Vue.config.productionTip = false

if (document.querySelector("#coral-form")) {
  const coralDonatorNature = document.querySelector("#coral-form").dataset.initialFiscalType;
  new Vue({
    vuetify,
    i18n,
    store: coralFormStore,
    render: h => h(App, {
      props: {
        donatorNature: coralDonatorNature
      }
    }),
  }).$mount('#coral-form')
}

if (document.querySelector("#reef-form")) {

  const reefDonatorNature = document.querySelector("#reef-form").dataset.initialFiscalType;
  new Vue({
    vuetify,
    i18n,
    store: reefFormStore,
    render: h => h(App, {
      props: {
        donatorNature: reefDonatorNature
      }
    })
  }).$mount('#reef-form')
}

if (document.querySelector("#donation-form")) {
  const donationType = document.querySelector("#donation-form").dataset.initialDonationType
  const donationNature = document.querySelector("#donation-form").dataset.initialFiscalType

  new Vue({
    vuetify,
    i18n,
    store: donationFormStore,
    render: h => h(DonationForm, {
      props: {
        type: donationType,
        donatorNature: donationNature
      }
    })
  }).$mount('#donation-form')
}

if (document.querySelector("#full-form")) {
  new Vue({
    vuetify,
    i18n,
    store: fullFormStore,
    render: h => h(FullForm, {})
  }).$mount('#full-form')
}

if (document.querySelector("#gift-code-form")) {
  new Vue({
    vuetify,
    i18n,
    store: giftFormStore,
    render: h => h(App, {}),
  }).$mount('#gift-code-form')
}