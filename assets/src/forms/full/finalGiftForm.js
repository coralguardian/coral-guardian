import AbstractForm from "../form";

export default class FinalGiftForm extends AbstractForm {
  form = {
    tabs: [
      {
        hide: true,
        title: "default.stepper.header.thanks"
      }
    ],
    steps: [
      {
        title: "default.stepper.finalRecipient.title",
        component: "FinalRecipientStep",
        validate: true,
        back: false,
        last: true
      }
    ]
  }
}