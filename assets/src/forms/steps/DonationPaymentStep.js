import Step from "@/forms/Step";

export default class DonationPaymentStep extends Step {
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
    )
  }
}
