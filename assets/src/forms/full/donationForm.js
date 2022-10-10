import AbstractForm from "../abstractForm";

export default class DonationForm extends AbstractForm {

  unload(state) {
    return new Promise(resolve => {
      state.data.project = null;
      resolve()
    })
  }

  constructor(project) {
    super();
    this.project = project
    this.steps = [
      {
        tab: {
          title: "default.stepper.header.donation",
        },
        title: "default.stepper.donation.title." + project,
        component: "DonationStep",
        validate: true
      },
      {
        tab: {
          title: "default.stepper.header.information"
        },
        title: "default.stepper.information.title",
        component: "InformationStep",
        validate: true
      },
      {
        tab: {
          title: "default.stepper.header.payment",
        },
        title: "default.stepper.payment.title",
        component: "PaymentStep",
        validate: true,
        customValidation: true,
        props: {
          mode: 'donation'
        },
        api: {
          method: "post",
          endpoint: "createOrder"
        }
      },
      {
        tab: {
          title: "default.stepper.header.thanks"
        },
        title: "default.stepper.finalDonation.title",
        component: "FinalDonationStep",
        back: false,
        isLast: true
      }
    ]
  }

  project;
}