import AbstractForm from "../abstractForm";

export default class RecipientFullForm extends AbstractForm {
  steps = [
    {
      tab: {
        title: "default.stepper.header.customizationSend"
      },
      component: "CustomizationSendStep",
      validate: true,
      customValidation: true,
      back: false,
      api: {
        method: "post",
        endpoint: "adoption/gift/message"
      }
    },
    {
      tab: {
        title: "default.stepper.header.recipients"
      },
      component: "MultipleRecipientStep",
      validate: true,
      api: {
        method: "post",
        endpoint: "adoption/gift/friend"
      }
    },
  ]
}