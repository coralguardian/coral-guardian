import AbstractForm from "../form";

export default class FinalGiftForm extends AbstractForm {
  form = {
    tabs: [
      {
        hide: true,
        title: "default.stepper.header.thanks"
      },
      {
        hide: true,
        title: "default.stepper.header.payment"
      },
      {
        hide: true,
        title: "default.stepper.header.thanks"
      }
    ],
    steps: [
      {
        title: "default.stepper.finalFriendAdoption.title",
        component: "FinalRecipientStep",
        validate: true,
        back: false
      },
      {
        title: "default.stepper.payment.title",
        component: "PaymentStep",
        props: {
          mode: 'donation'
        },
        validate: true,
        customValidation: true,
        api: {
          method: "post",
          endpoint: "createDonation"
        }
      },
      {
        title: "default.stepper.finalDonation.title",
        component: "FinalDonationStep",
        back: false
      }
    ]
  }
}