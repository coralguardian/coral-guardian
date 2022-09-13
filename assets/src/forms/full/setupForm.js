import AbstractForm from "../form";

export default class SetupForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.adopterType",
      },
      {
        title: "default.stepper.header.full.setup",
      },
      {
        title: "default.stepper.header.project",
      }
    ],
    steps: [
      {
        component: "AdopterTypeStep"
      },
      {
        component: "SetupStep",
        larger: true,
        validate: true,
        customValidation: true
      },
      {
        component: "ProjectStep",
        validate: true,
        customValidation: true
      }
    ]
  }
}