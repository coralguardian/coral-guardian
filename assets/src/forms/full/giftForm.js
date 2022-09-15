import AbstractForm from "../abstractForm";

export default class GiftForm extends AbstractForm {
  steps = [
    {
      tab: {
        title: "default.stepper.header.full.adoption",
      },
      component: "AdoptionSetupStep",
      validate: true,
      customValidation: true
    },
    {
      tab: {
        title: "default.stepper.header.adoption",
      },
      title: "default.stepper.adoption.title",
      component: null,
      componentType: "adoption"
    },
    {
      tab: {
        title: "default.stepper.header.information"
      },
      title: "default.stepper.information.title",
      component: "InformationStep",
      validate: true,
      api: {
        method: "post",
        endpoint: "customer"
      },
      props: {
        newsletterFullBlock: true,
        isCompany: true,
        isGiftCustom: true
      }
    },
    {
      tab: {
        title: "default.stepper.header.payment",
      },
      title: "default.stepper.payment.title",
      component: "PaymentStep",
      validate: true,
      customValidation: true,
      api: {
        method: "post",
        endpoint: "adoption/gift"
      },
      props: {
        bankTransfer: true
      }
    }
  ]
}