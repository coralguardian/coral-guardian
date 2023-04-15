import Step from "@/forms/Step";

export default class RecipientCustomizationStep extends Step {
  constructor() {
    super(
      null,
      4,
      "RecipientCustomizationStep",
      () => true,
      true,
      false,
      true,
      true
    )
  }

  evaluate(state) {
    return state.data.adopter.send_to_friend
  }
}
