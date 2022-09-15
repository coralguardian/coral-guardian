import AbstractForm from "../abstractForm";

export default class RecipientForm extends AbstractForm {
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