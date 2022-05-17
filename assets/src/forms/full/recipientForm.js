import AbstractForm from "../form";

export default class RecipientForm extends AbstractForm{
  form = {
    tabs: [
      {
        title: "default.stepper.header.recipients"
      }
    ],
    steps: [
      {
        component: "MultipleRecipientStep",
        validate: true,
        back: false,
        api: {
          method: "post",
          endpoint: "createGifts"
        }
      },
    ]
  }
}