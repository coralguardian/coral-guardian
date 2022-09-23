import AbstractForm from "../abstractForm";
import FinalGiftForm from "@/forms/full/finalGiftForm";

export default class RecipientForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve) => {
      context.dispatch('loadForm', new FinalGiftForm()).then(() => resolve())
    })
  }

  steps = [
    {
      tab: {
        title: "default.stepper.header.recipients"
      },
      component: "MultipleRecipientStep",
      validate: true,
      back: false,
      api: {
        method: "post",
        endpoint: "adoption/gift/friend"
      }
    },
  ]
}