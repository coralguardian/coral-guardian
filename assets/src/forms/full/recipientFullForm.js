import AbstractForm from "../form";

export default class RecipientFullForm extends AbstractForm{
  form = {
    tabs: [
      {
        title: "default.stepper.header.customizationSend"
      },
      {
        title: "default.stepper.header.recipients"
      }
    ],
    steps: [
      {
        component: "CustomizationSendStep",
        validate: true,
        customValidation: true,
        back: false
      },
      {
        component: "MultipleRecipientStep",
        validate: true,
        api: {
          method: "post",
          endpoint: "adoption/gift/friend"
        }
      },
    ]
  }
}