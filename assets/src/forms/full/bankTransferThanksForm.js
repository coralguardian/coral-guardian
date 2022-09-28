import AbstractForm from "../abstractForm";

export default class BankTransferThanksForm extends AbstractForm {

  steps = [
    {
      tab: {
        title: "default.stepper.header.thanks",
      },
      title: "default.stepper.bankTransferThanks.title",
      component: "BankTransferThanksStep",
      back: false,
      isLast: true
    }
  ]
}