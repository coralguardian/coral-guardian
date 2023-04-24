import Vue from 'vue'
import App from "./App";
import FullForm from "./FullForm";
import DonationForm from "@/DonationForm.vue";
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './styles/styles.scss'
import giftFormStore from "@/store/giftCodeFormStore";
import donationFormStore from "@/store/donationFormStore";
import adoptionFormStore from "@/store/adoptionFormStore";
import depositFormStore from "@/store/depositFormStore";

Vue.config.productionTip = false

if (document.querySelector("#full-form")) {
  new Vue({
    vuetify,
    i18n,
    store: adoptionFormStore,
    render: h => h(FullForm, {})
  }).$mount('#full-form')
}

if (document.querySelector("#donation-form")) {
  new Vue({
    vuetify,
    i18n,
    store: donationFormStore,
    render: h => h(DonationForm, {})
  }).$mount('#donation-form')
}

if (document.querySelector("#gift-code-form")) {
  new Vue({
    vuetify,
    i18n,
    store: giftFormStore,
    render: h => h(App, {}),
  }).$mount('#gift-code-form')
}

if (document.querySelector("#deposit-form")) {
  new Vue({
    vuetify,
    i18n,
    store: depositFormStore,
    render: h => h(FullForm, {}),
  }).$mount('#deposit-form')
}
