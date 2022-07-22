export default {
  coral: "coral | corals",
  reef: {
    base: "reef | reefs",
    lady: "Damsel Fish reef | Damsel Fish reefs",
    butterfly: "Butterfly Fish reef | Butterfly Fish reefs",
    napoleon: "Napoleon Fish reef | Napoleon Fish reefs",
    tooltip: "A reef is composed of several corals.<br>You can adopt a reef of 30, 75 or 150 corals."
  },
  gift: "gift",
  onehsot: "one-off",
  monthly: "monthly",
  ui: {
    continue: "Continue",
    previous: "Previous"
  },
  rules: {
    required: "This field is required",
    minLength: "This field must be at least {count} characters long",
    email: "Invalid email",
    specialChar: "Characters not allowed",
    digitOnly: "This field must contain digits only",
    minValue: "This field must be superior to {min}"
  },
  stripe: {
    payment: {
      success: "Your payment has been successfully completed!",
      processing: "Your payment is being validated",
      error: "An error has occurred, please try again",
      refused: "Your payment has been declined, please try again"
    }
  },
  deduction: {
    description: "I wish to make a <b>donation</b> of {donation} €."
  },
  stepper: {
    header: {
      adoption: "Adoption",
      customization: "Personalisation",
      donation: "Donation",
      information: "Information",
      payment: "Payment",
      friend: "Your recipient",
      recipients: "Recipients",
      gift: "Gift",
      full: {
        setup: "What do you wish to do?",
        adoption: "What do you wish to adopt?"
      },
      customizationSend: "Email customisation",
      thanks: "Thank you!"
    },
    adoption: {
      title: "Adopt a {item} | Adopt {item}",
      description: "<b>For {donation} €</b>, bring endangered marine ecosystems back to life.",
      corals: {
        hint: {
          individual: "Adopt an entire reef of 30 corals by clicking here \"<a href='/en/adopt-a-reef-individuals/'>Adopt a reef</a>\"!",
          company: "Adopt an entire reef of 30 corals by clicking here \"<a href='/en/adopt-a-reef-company/'>Adopt a reef</a>\"!"
        }
      },
      reefs: {
        lady: {
          title: "Damsel Fish",
          description: "Damsel Fish Reef of <b>30 corals</b> (from 900 €)"
        },
        butterfly: {
          title: "Butterfly Fish",
          description: "Butterfly Fish Reef of <b>75 corals</b> (from 2250 €)"
        },
        napoleon: {
          title: "Napoleon Fish",
          description: "Napoleon Fish Reef of <b>150 corals</b> (from 4500 €)"
        },
        max: "Do you wish to adopt more than {max} {item} ? <a href='/en/contact/'>Contact-us directly</a>!"
      },
      customAmount: {
        label: "Amount:",
        hint: "The donation surplus will be used to support all of our actions."
      }
    },
    adoptionSetup: {
      error: "Please select the type of adoption."
    },
    bankTransferThanks: {
      title: "Your payment by bank transfer is pending",
      description: "As soon as your transfer is validated, you will receive an email with a link to continue the custom adoption process.",
      seeYouSoon: "See you soon!"
    },
    choice: {
      title: "Adopt a {item}!",
      buttons: {
        me: {
          text: "Adopt a {item}",
          tooltip: "You will be able to choose the name of the adopted {item} and directly download your personalised adoption certificate(s)."
        },
        friend: {
          text: "Adopt a {item} as a gift",
          tooltip: "Your recipient will immediately receive a code allowing them to choose the name(s) of the adopted {item} and download the corresponding certificate(s)."
        },
        company: "I am a company",
        offered: "I received a code to adopt a {item}!"
      }
    },
    customization: {
      title: "Name your {item} | Name your {item}",
      description: "Give a name to your adopted {item}, you can choose the one you want! |Give a name to each of your adopted {item}, you can choose the one you want!",
      input: {
        label: "Name of your {item} | Certificate n°{number}",
        placeholder: "Name of your {item}"
      },
      downloadCsv: {
        label: "By clicking on the button below, you will download a file that will allow you to name your corals.<br>Once you have filled it in, you can send the file to us by email.",
        btnLabel: "Download the Excel sheet"
      }
    },
    customizationSend: {
      message: {
        title: "Write a message",
        description: "You can write a message to your recipients.<br>This message will be common to all recipients.",
        placeholder: "Your message"
      },
      send: {
        title: "Schedule sending",
        description1: "You can schedule for the gift codes to be sent to your recipients at a later date. This way the email will be sent on the morning of the day you selected.",
        description2: "If you do not schedule the sending, the gift codes will be sent immediately after you complete the payment.",
        checkbox: "I wish to choose at which date my gift code is sent"
      }
    },
    donation: {
      title: {
        france: "Support Coral Guardian"
      },
      description: "Every donation counts! Take part in restoring coral reef ecosystems.",
      buttons: {
        unique: "Donate once",
        recurrent: "Donate monthly",
        uniques: "Donate once"
      }
    },
    friend: {
      title: "Fill in your recipient's information",
      form: {
        firstname: "First name",
        name: "Surname",
        mail: "Email",
        message: "Personal message"
      }
    },
    setup: {
      adopt: "Adopt",
      offer: "Gift",
      donation: "Donate",
      tooltips: {
        me: "You can choose the name of your adoption(s) and download the personalised adoption certificate(s) directly.",
        recipient: "Your recipients will immediately receive a code allowing them to name their adoption(s) and download the corresponding adoption certificate(s)."
      }
    },
    gift: {
      title: "Your gift",
      description: "Did someone adopt a gift for you?<br>To adopt it, enter the gift code you received by email.",
      input: {
        label: "Gift code",
        placeholder: "Your gift code"
      }
    },
    information: {
      title: "Please provide us with the following information",
      description: "The requested information is used for the sole purpose of editing your tax receipt.",
      company: {
        cols: {
          information: {
            companyName: "Company name*",
            firstname: "First name of main contact*",
            name: "Last name of main contact*",
            mail: "Email of main contact*"
          },
          contact: {
            address: "Head office address*"
          }
        }
      },
      cols: {
        information: {
          title: "Information",
          firstname: "First name",
          name: "Surname",
          mail: "Email"
        },
        contact: {
          title: "Billing details",
          address: "Address",
          postalCode: "Postal code",
          city: "Town",
          country: "Country"
        }
      }
    },
    monthlyDonation: {
      description: "Ensure the evolution of the restoration area through a monthly donation which will help us continue to protect, restore and raise awareness."
    },
    multipleAdoption: {
      description: "Give a name to your {item}, you can choose whatever name you want! 2 solutions are available to you : | Give a name to each one of your {item}, pick the name you want! 2 solutions are available to you:",
      tabs: {
        fields: {
          title: "Fill in the fields",
          description: "I fill in each name for my {item} in the fields below :"
        },
        file: {
          title: "Send a file",
          subtitle: "I have a lot of {item} to name? I would rather send a file with all the names for my {item}.",
          description: "I download the Excel file provided for me. Once completed, I go to the address given in the confirmation email I received, and deposit my file in the field provided.",
          button: "Download the Excel file",
          upload: {
            label: "Your file",
            description: "Submit your completed Excel sheet with the names you have chosen here:"
          }
        }
      }
    },
    multipleRecipient: {
      description: "Fill in the details of your recipients so that they receive their respective gift codes. You have 2 options:",
      tabs: {
        fields: {
          title: "Fill in the fields",
          description: "I fill in the details of each of my recipients in the fields below:",
          recipient: "Recipient n°{index}"
        },
        file: {
          title: "Send a file",
          subtitle: "I would rather send a file later with the details of my recipients",
          description: "I download the Excel file provided to me. Once filled in, I go to the address given in the confirmation email I received and I deposit my file in the field provided for this purpose.",
          button: "Download the file",
          upload: {
            label: "Your file",
            description: "Upload your recipient excel file here :"
          }
        }
      }
    },
    payment: {
      methods: {
        card: {
          tab: "Card",
          button: "I wish to pay by card"
        },
        bank: {
          tab: "Bank transfer",
          button: "Download the IBAN",
          description: "To pay by bank transfer, download the IBAN of the NGO and make the payment via your bank.",
          hint: "A processing time of 2 to 5 days is to be expected while validating the payment. Once validated, you will receive an email allowing you to continue your order."
        }
      },
      title: "Proceed to payment",
      description: "The payment is secured through the Stripe payment module 🔒",
      reminder: {
        title: "Review your donation",
        adoption: {
          description: "{count} {item} transplanted on Hatamin island in Indonesia. | {count} {item} transplanted on Hatamin island in Indonesia."
        },
        donation: {
          description: "Your {item} donation will help us continue all of our actions."
        }
      },
      errors: {
        card: "Please provide your payment details"
      }
    },
    finalAdoption: {
      title: "Congratulations and thank you, you have adopted {count} {item}",
      description: "Your tax receipt and adoption certificate have been sent by email. You can also download them directly by clicking <a href='{link}' target='_blank'>here</a>.| Your tax receipt and adoption certificates have been sent to you by email. You can also download them directly by clicking <a href='{link}' target='_blank'>here</a>.",
      description_no_certif: "Your tax receipt has been sent to you by email.  You will receive your adoption certificates once you have sent us your file with the names you wish to give your corals.| Your tax receipt has been sent to you by email. You will receive your adoption certificates once you have sent us your file with the names you wish to give your corals.",
      description_file: "Your tax receipt has been sent by email.<br>You have chosen to send us the name of your {item} using the file provided. Your tax receipt has been sent by email. You have chosen to send us the names of your {item} using the file provided. Once you have completed it, you can send it back to us at the address given in the confirmation email you have just received."
    },
    finalFriendAdoption: {
      title: "Congratulations and thank you, you have adopted {count} {item} for your recipient",
      description: "Your tax receipt has been sent to you by email. <br><br>Your recipient's coupon code is: {orderToken}.<br><br>Your recipient will receive an email to personalize their adoption certificate!"
    },
    finalFriendGift: {
      title: "Congratulations and thank you, you have adopted {count} {item}",
      description: "Your certificate of adoption has been sent to you by email. You can also download them directly by clicking <a href='{link}' target='_blank'>here</a>.| Your adoption certificates have been sent to you by email. You can also download them directly by clicking <a href='{link}' target='_blank'>here</a>."
    },
    finalDonation: {
      title: "Congratulations and thanks for your support",
      description: "Your tax receipt will be sent to you by email.<br><br>Do you wish to receive news of all our actions and projects? Subscribe to our newsletter right <a href='/en/newsletter-coral-guardian/'>here</a>!<br>For any question, write to us at <a href='mailto:info@coralguardian.org'>info@coralguardian.org</a>",
      bankTransfer: "Your transfer is pending. Once validated, you will receive an email containing your tax receipt."
    },
    finalRecurrentDonation: {
      title: "Congratulations and thank you for your monthly donation",
      description: "Your tax receipt summarizing all your donations for the current fiscal year will be sent to you by email next January.<br><br>Do not hesitate to subscribe to our newsletter <a href='/en/newsletter-coral-guardian/'>here</a> to receive news on the progress of our projects every month."
    },
    finalRecipient: {
      title: "Congratulations and thank you, you have made a gift of {count} {item}",
      description: "Your tax receipt has been sent by email.",
      description2: "If you have chosen to send us the names of your recipients using the file provided, you can fill it in and send it back to us at the address indicated in the confirmation email you just received."
    }
  },
  errors: {
    base: "An error occurred, please try again later.",
    already_named: "This code has already been used to name the adopted {item}.",
    order_incompatible_type: "This code doesn't seem to correspond to the related adoption.",
    invalid_type: "This code does not correspond to any coral adoption.",
    download_file: "Please download the file before continuing.",
    wrong_token: "The order number appears to be invalid. If the problem persists, please contact us directly."
  },
  donation: {
    monthly: {
      description: "Keep supporting our daily actions to protect coral reefs with a monthly donation!"
    }
  },
  newsletter: {
    title: "Subscribe to our newsletter",
    description: "Receive monthly updates on the progress of our projects.",
    label: "I would like to subscribe to the Coral Guardian monthly newsletter.",
    otherEmail: {
      description: "If you wish to sign up with <b>another email address</b> than the one entered in the form, please fill in the field below.",
      email: "Email"
    }
  },
  giftCustom: {
    title: "Gift code sending options*",
    radios: {
      dont: "I wish to receive the gift code(s) on my email address",
      send: "I want to fill in the email addresses of the recipient(s) so that they receive their code directly (importing a contact file is possible)"
    }
  }
}