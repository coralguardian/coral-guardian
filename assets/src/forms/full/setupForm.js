import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import DonationForm from "@/forms/full/donationForm";
import ProjectEnum from "@/enums/projectEnum";
import ActionEnum from "@/enums/actionEnum";
import ProjectForm from "@/forms/full/projectForm";

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
        case ActionEnum.donation:
          context.dispatch('updateForm', {project: ProjectEnum.indonesia})
          context.dispatch('loadForm', new DonationForm(context.state.data.project))
            .then(() => resolve())
          break;
        default:
          reject("Formulaire non trouvé")
      }
    })
  }

  steps = [
    {
      tab: {
        title: "default.stepper.header.adopterType",
      },
      component: "AdopterTypeStep",
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.adopter.type === null
      }
    },
    {
      tab: {
        title: "default.stepper.header.full.setup",
      },
      component: "SetupStep",
      larger: true,
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.target === null
      }
    }
  ]
}