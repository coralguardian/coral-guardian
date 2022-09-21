import Vue from 'vue'
import App from "./App";
import FullForm from "./FullForm";
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import fullFormStore from "./store/fullFormStore";
import giftFormStore from "./store/giftCodeFormStore";
import './styles/styles.scss'

Vue.config.productionTip = false

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