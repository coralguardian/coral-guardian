import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import ProjectForm from "@/forms/full/projectForm";
import Step from "@/forms/Step";
import SetupStep from "@/forms/steps/SetupStep";

export default class SetupForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve, reject) => {
      let state = context.state

      if (state.data.adopter.type === null ||
        state.data.target === null) {
        throw "Les données nécessaires ne sont pas disponibles !"
      }

      switch (state.data.target) {
        case adoptionHelper.me:
        case adoptionHelper.friend:
          context.dispatch('loadForm', new ProjectForm())
            .then(() => resolve())
          break;
        default:
          reject("Formulaire non trouvé")
      }
    })
  }

  steps = [
    new Step(
      "default.stepper.header.adopterType",
      1,
      "AdopterTypeStep",
      (state) => state.data.adopter.type === null,
      true,
      false,
      true,
      false
    ),
    new SetupStep()
  ]
}
