import Step from "@/forms/Step";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

export default class FinalAdoptionStep extends Step {
  constructor() {
    super(
      null,
      null,
      "FinalAdoptionStep",
      () => true,
      false,
      false,
      false,
      false,
      {method: "get", endpoint: "getCertificates"},
      false,
      true
    )
  }

  evaluate(state) {
    return state.data.payment_method === PaymentMethodEnum.creditCard
  }
}
