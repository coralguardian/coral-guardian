import Step from "@/forms/Step";

export default class RecipientCustomizationStep extends Step {
  constructor() {
    super(
      "default.stepper.header.customizationSend",
      4,
      "RecipientCustomizationStep",
      () => true,
      true,
      false,
      false,
      true
    )
  }

  evaluate(state) {
    return state.data.adopter.send_to_friend
  }
}
