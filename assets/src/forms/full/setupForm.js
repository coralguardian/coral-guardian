import AbstractForm from "../form";

export default class SetupForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.full.setup",
      }
    ],
    steps: [
      {
        component: "SetupStep",
        larger: true
      }
    ]
  }
}