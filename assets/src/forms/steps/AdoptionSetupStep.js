import Step from "@/forms/Step";
import ProjectEnum from "@/enums/projectEnum";

export default class AdoptionSetupStep extends Step {
  constructor() {
    super(
      "default.stepper.header.full.adoption",
      1,
      "AdoptionSetupStep",
      (state) => {
        return state.data.order.productType === null
      },
      true,
      false,
      true,
      true
    )
  }

  evaluate(state) {
    return state.data.project === ProjectEnum.indonesia
  }
}
