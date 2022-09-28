import AbstractForm from "../abstractForm";
import FinalGiftForm from "@/forms/full/finalGiftForm";

export default class RecipientFullForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve) => {
      context.dispatch('loadForm', new FinalGiftForm()).then(() => resolve())
    })
  }

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