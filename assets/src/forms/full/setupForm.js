import AbstractForm from "../form";

export default class SetupForm extends AbstractForm {
  steps = [
    {
      tab: {
        title: "default.stepper.header.adopterType",
      },
      component: "AdopterTypeStep",
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
    },
    {
      tab: {
        title: "default.stepper.header.project",
      },
      component: "ProjectStep",
      validate: true,
      customValidation: true
    }
  ]
}