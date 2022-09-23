import AbstractForm from "../abstractForm";

export default class FinalGiftForm extends AbstractForm {

  nextForm() {
    return null;
  }

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
      isLast: true
    }
  ]
}