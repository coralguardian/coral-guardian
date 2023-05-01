import Step from "@/forms/Step";

export default class SetupStep extends Step {
  constructor() {
    super(
      "default.stepper.header.full.setup",
      1,
      "SetupStep",
      (state) => state.data.target === null,
      true,
      false,
      true,
      true
    )
  }

  destroy(state) {
    state.data.order.type = null
    state.data.target = null
  }
}
