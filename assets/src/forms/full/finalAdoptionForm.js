import AbstractForm from "../abstractForm";

export default class FinalAdoptionForm extends AbstractForm {

  nextForm() {
    return null;
  }

  constructor(project) {
    super();
    this.project = project
    this.steps = [
      {
        tab: {
          title: "default.stepper.header.customization",
        },
        title: "default.stepper.customization.title." + project,
        component: "NamingAdoptionStep",
        validate: true,
        back: false,
        api: {
          method: "post",
          endpoint: "adoption/naming"
        }
      },
      {
        tab: {
          hide: true,
          title: "default.stepper.header.thanks"
        },
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
