import AbstractForm from "../form";

export default class DonationForm extends AbstractForm {
  constructor(project) {
    super();
    this.project = project
    this.form = {
      tabs: [
        {
          title: "default.stepper.header.donation",
        },
        {
          title: "default.stepper.header.information"
        },
        {
          title: "default.stepper.header.payment",
        },
        {
          hide: true,
          title: "default.stepper.header.thanks"
        }
      ],
      steps: [
        {
          title: "default.stepper.donation.title." + project,
          component: "DonationStep",
          validate: true
        },
        {
          title: "default.stepper.information.title",
          component: "InformationStep",
          validate: true,
          api: {
            method: "post",
            endpoint: "customer"
          }
        },
        {
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
          title: "default.stepper.finalDonation.title",
          component: "FinalDonationStep",
          back: false,
          isLast: true
        }
      ]
    }
  }

  project;
  form;
}