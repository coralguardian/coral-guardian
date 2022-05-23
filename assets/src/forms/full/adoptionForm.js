import AbstractForm from "../form";

export default class AdoptionForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.full.adoption",
      },
      {
        title: "default.stepper.header.adoption",
      },
      {
        title: "default.stepper.header.information"
      },
      {
        title: "default.stepper.header.payment"
      }
    ],
    steps: [
      {
        component: "AdoptionSetupStep",
        validate: true,
        customValidation: true
      },
      {
        title: "default.stepper.adoption.title",
        component: null,
        componentType: "adoption"
      },
      {
        title: "default.stepper.information.title",
        component: "InformationStep",
        validate: true,
        api: {
          method: "post",
          endpoint: "customer"
        },
        props: {
          newsletterFullBlock: true,
          isCompany: true
        }
      },
      {
        title: "default.stepper.payment.title",
        component: "PaymentStep",
        validate: true,
        customValidation: true,
        api: {
          method: "post",
          endpoint: "adoption"
        },
        props: {
          bankTransfer: true
        }
      }
    ]
  }
}