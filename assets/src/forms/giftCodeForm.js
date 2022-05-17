import AbstractForm from "./form";

export default class GiftCodeForm extends AbstractForm {
  form = {
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
          endpoint: "getGiftOrder"
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
        title: "default.stepper.finalFriendGift.title",
        component: "FinalFriendGiftAdoptionStep",
        back: false,
        api: {
          method: "get",
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
  }
}