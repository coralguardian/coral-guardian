import AbstractForm from "../form";

export default class FinalAdoptionForm extends AbstractForm {
  form = {
    tabs: [
      {
        title: "default.stepper.header.customization",
      },
      {
        hide: true,
        title: "default.stepper.header.thanks"
      }
    ],
    steps: [
      {
        title: "default.stepper.customization.title",
        component: "MultipleAdoptionStep",
        validate: true,
        back: false,
        api: {
          method: "post",
          endpoint: "adoption/naming"
        }
      },
      {
        title: "default.stepper.finalAdoption.title",
        component: "FinalAdoptionStep",
        validate: true,
        api: {
          method: "get",
          endpoint: "getCertificates"
        },
        back: false,
        isLast: true
      }
    ]
  }
}