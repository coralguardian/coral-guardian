import AbstractForm from "../form";

export default class BankTransferThanksForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.thanks",
      }
    ],
    steps: [
      {
        title: "default.stepper.bankTransferThanks.title",
        component: "BankTransferThanksStep",
        back: false,
        isLast: true
      }
    ]
  }
}