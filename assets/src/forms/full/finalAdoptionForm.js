import AbstractForm from "../form";

export default class FinalAdoptionForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.customization",
      },
      {
        hide: true,
        title: "default.stepper.header.thanks"
      },
      {
        hide: true,
        title: "default.stepper.header.payment"
      },
      {
        hide: true,
        title: "default.stepper.header.thanks"
      }
    ],
    steps: [
      {
        title: "default.stepper.customization.title",
        component: "MultipleAdoptionStep",
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
        back: false,
        isLast: true
      }
    ]
  }
}