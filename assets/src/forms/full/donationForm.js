import AbstractForm from "../form";

export default class DonationForm extends AbstractForm {
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
        validate: true,
        api: {
          method: "post",
          endpoint: "customer"
        }
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
          endpoint: "donate"
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