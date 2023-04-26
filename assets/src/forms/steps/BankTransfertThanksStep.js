import Step from "@/forms/Step";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

export default class BankTransferThanksStep extends Step {
  constructor() {
    super(
      null,
      null,
      "BankTransferThanksStep",
      () => true,
      false,
      false,
      false,
      false,
      null,
      false,
      true
    )
  }

  evaluate(state) {
    return state.data.payment_method === PaymentMethodEnum.bankTransfer
  }
}
