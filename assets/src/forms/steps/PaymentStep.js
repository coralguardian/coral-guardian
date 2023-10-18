import Step from "@/forms/Step";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";

export default class PaymentStep extends Step {
  constructor() {
    super(
      "default.stepper.payment.title",
      6,
      "PaymentStep",
      () => true,
      true,
      false,
      true,
      true,
      {method: "post", endpoint: "createOrder"},
      true,
      false,
      'pay'
    )
  }

  destroy(state) {
    state.data.payment_method = PaymentMethodEnum.creditCard
  }
}
