import AbstractForm from "../abstractForm";

export default class FinalGiftForm extends AbstractForm {
  steps = [
    {
      tab: {
        hide: true,
        title: "default.stepper.header.thanks"
      },
      title: "default.stepper.finalRecipient.title",
      component: "FinalRecipientStep",
      validate: true,
      back: false,
      last: true
    }
  ]
}