import Vue from 'vue';
import Vuex from 'vuex';
import adoptionHelper from "@/helpers/adoptionHelper";
import {BaseAdoptionFormStore} from "@/store/baseAdoptionFormStore";
// import i18n from "@/plugins/i18n";

const form = new BaseAdoptionFormStore('coral', 30, null)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...form.state,
    interval: {
      min: 20,
      max: 30
    },
    forms: [
      {
        target: adoptionHelper.me,
        tabs: [
          {
            visible: true,
            title: "default.stepper.header.adoption",
            class: 'round-left-top'
          },
          {
            visible: true,
            title: "default.stepper.header.information"
          },
          {
            visible: true,
            title: "default.stepper.header.payment"
          },
          {
            visible: true,
            title: "default.stepper.header.customization",
            class: 'round-right-top'
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          }
        ],
        steps: [
          {
            title: "default.stepper.adoption.title",
            component: "CoralAdoptionStep"
          },
          {
            title: "default.stepper.information.title",
            component: "InformationStep",
            validate: true,
            api: {
              method: "post",
              endpoint: "createCustomer"
            }
          },
          {
            title: "default.stepper.payment.title",
            component: "PaymentStep",
            validate: true,
            customValidation: true,
            api: {
              method: "post",
              endpoint: "createOrder"
            }
          },
          {
            title: "default.stepper.customization.title",
            component: "CustomizationStep",
            validate: true,
            back: false,
            api: {
              method: "post",
              endpoint: "createAdoptions"
            }
          },
          {
            title: "default.stepper.finalAdoption.title",
            component: "FinalAdoptionStep",
            back: false,
            validate: true,
            api: {
              method: "get",
              endpoint: "getCertificates"
            }
          },
          {
            title: "default.stepper.payment.title",
            component: "PaymentStep",
            props: {
              mode: 'donation'
            },
            validate: true,
            customValidation: true,
            api: {
              method: "post",
              endpoint: "createDonation"
            }
          },
          {
            title: "default.stepper.finalDonation.title",
            component: "FinalDonationStep",
            back: false
          }
        ]
      },
      {
        target: adoptionHelper.friend,
        tabs: [
          {
            visible: true,
            title: "default.stepper.header.adoption",
            class: 'round-left-top'
          },
          {
            visible: true,
            title: "default.stepper.header.information"
          },
          {
            visible: true,
            title: "default.stepper.header.friend"
          },
          {
            visible: true,
            title: "default.stepper.header.payment",
            class: 'round-right-top'
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          }
        ],
        steps: [
          {
            title: "default.stepper.adoption.title",
            component: "CoralAdoptionStep"
          },
          {
            title: "default.stepper.information.title",
            component: "InformationStep",
            validate: true,
            api: {
              method: "post",
              endpoint: "createCustomer"
            }
          },
          {
            title: "default.stepper.friend.title",
            component: "FriendStep",
            validate: true
          },
          {
            title: "default.stepper.payment.title",
            component: "PaymentStep",
            validate: true,
            customValidation: true,
            api: {
              method: "post",
              endpoint: "createOrder"
            }
          },
          {
            title: "default.stepper.finalFriendAdoption.title",
            component: "FinalFriendAdoptionStep",
            back: false
          },
          {
            title: "default.stepper.payment.title",
            component: "PaymentStep",
            props: {
              mode: 'donation'
            },
            validate: true,
            customValidation: true,
            api: {
              method: "post",
              endpoint: "createDonation"
            }
          },
          {
            title: "default.stepper.finalDonation.title",
            component: "FinalDonationStep",
            back: false
          }
        ]
      },
      {
        target: adoptionHelper.offered,
        tabs: [
          {
            visible: true,
            title: "default.stepper.header.gift",
            class: 'round-left-top'
          },
          {
            visible: true,
            title: "default.stepper.header.customization",
            class: 'round-right-top'
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          },
          {
            visible: false,
            title: null
          }
        ],
        steps: [
          {
            title: "default.stepper.gift.title",
            component: "GiftStep",
            validate: true,
            api: {
              method: "post",
              endpoint: "adoption/friend"
            }
          },
          {
            title: "default.stepper.customization.title",
            component: "CustomizationStep",
            validate: true,
            api: {
              method: "post",
              endpoint: "createAdoptions"
            }
          },
          {
            title: "default.stepper.finalFriendGift.title",
            component: "FinalFriendGiftAdoptionStep",
            back: false,
            api: {
              endpoint: "getCertificates"
            }
          },
          {
            title: "default.stepper.information.title",
            component: "InformationStep",
            validate: true,
            api: {
              method: "post",
              endpoint: "createCustomer"
            }
          },
          {
            title: "default.stepper.payment.title",
            component: "PaymentStep",
            props: {
              mode: 'donation'
            },
            validate: true,
            customValidation: true,
            api: {
              method: "post",
              endpoint: "createDonation"
            }
          },
          {
            title: "default.stepper.finalDonation.title",
            component: "FinalDonationStep",
            back: false
          }
        ]
      },
    ]
  },
  getters: {
    ...form.getters,
    hasDownloaded: state => state.data.hasDownloaded ? state.data.hasDownloaded : null
  },
  mutations: {
    ...form.mutations
  },
  actions: {
    ...form.actions
  }
})
