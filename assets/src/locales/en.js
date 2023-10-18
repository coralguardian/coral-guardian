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
  oneshot: "one-off",
  monthly: "monthly",
  ui: {
    continue: "Continue",
    previous: "Previous",
    through: "Next step",
    pay: "Pay and finish",
    finalized: "Finalised"
  },
  rules: {
    required: "This field is required",
    minLength: "This field must be at least {count} characters long",
    maxLength: "This field must contain {count} maximum characters.",
    email: "Invalid email",
    specialChar: "Character(s) not allowed",
    digitOnly: "This field must contain digits only",
    minValue: "This field must be superior to {min}"
  },
  stripe: {
    payment: {
      success: "Your payment has been successfully completed!",
      processing: "Your payment is being validated.",
      error: "An error has occurred, please try again.",
      refused: "Your payment has been declined, please try again."
    }
  },
  breadcrumb: {
    base: "Thank you! You wish to <b>{type}</b> a coral or a reef.",
    project: "Thank you! You wish to <b>{type}</b> a coral or a reef in <b>{project}</b>.",
    product: "Thank you! You wish to <b>{type}</b> a <b>{product}</b> in <b>{project}</b>.",
    price: "Thank you! You wish to <b>{type} {quantity} {product}</b> in <b>{project}</b> for <b>{price}€</b>.",
    monthlyDonation: "You have generously added a <b>monthly donation of {donation}€</b>.",
    types: {
      regular: "adopt",
      gift: "offer"
    }
  },
  share: "Share on",
  deduction: {
    description: "I wish to make a <b>donation</b> of {donation}€."
  },
  stepper: {
    header: {
      adopterType: "You are?",
      adoption: "Adoption",
      bonusDonation: "Support our actions on a daily basis",
      customization: "Customisation",
      donation: "Donation",
      information: "Information",
      payment: "Payment",
      project: "Which project do you wish to support?",
      friend: "Your recipient",
      recipients: "Recipients",
      gift: "Gift",
      full: {
        setup: "What do you wish to do?",
        adoption: "What do you wish to adopt?"
      },
      customizationSend: "Customisation",
      thanks: "Thank you!"
    },
    adopterType: {
      individual: "An individual",
      company: "A company"
    },
    adoption: {
      title: "Adopt a {item} | Adopt {item}",
      description: "<b>For {donation}€</b>, contribute to bringing endangered marine ecosystems back to life.",
      corals: {
        hint: {
          individual: "Adopt an entire reef of 30 corals by clicking here \"<a href='/en/adopt-a-reef-individuals/'>Adopt a reef</a>\"!",
          company: "Adopt an entire reef of 30 corals by clicking here \"<a href='/en/adopt-a-reef-company/'>Adopt a reef</a>\"!"
        }
      },
      reef: {
        lady: {
          title: "Damsel Fish",
          description: "Damsel Fish Reef of <b>30 corals</b> (from 900€)"
        },
        butterfly: {
          title: "Butterfly Fish",
          description: "Butterfly Fish Reef of <b>75 corals</b> (from 2250€)"
        },
        napoleon: {
          title: "Napoleon Fish",
          description: "Napoleon Fish Reef of <b>150 corals</b> (from 4500€)"
        },
        max: "Do you wish to adopt more than {max} {item}? <a href='mailto:n.radouane@coralguardian.org'>Contact us directly</a>!"
      },
      customAmount: {
        label: "Amount:",
        other: "Other amount",
        hint: "The donation surplus will be used to support all of our actions."
      },
      quantity: {
        label: "Quantity",
        hint: "Surplus donations will be used to support all our actions."
      }
    },
    adoptionSetup: {
      error: "Please select the type of adoption."
    },
    bankTransferThanks: {
      hint: "Your payment by bank transfer is pending",
      description: "As soon as your transfer is validated, you will receive an email with a link to continue the custom adoption process.",
      seeYouSoon: "We'll be in touch!"
    },
    bonusDonation: {
      title: "Optional : support our day-to-day actions!"
    },
    certificate: {
      gift: {
        email: "Your adoption certificate will be sent to you by email within the next 15 minutes.| Your adoption certificates will be sent to you by email within the next 15 minutes."
      },
      adoption: {
        email: "Your tax receipt and adoption certificate will be sent to you by email within 15 minutes. | Your tax receipt and adoption certificates will be sent to you by email within 15 minutes."
      }
    },
    choice: {
      title: "Adopt a {item}!",
      buttons: {
        me: {
          text: "Adopt a {item}",
          tooltip: "You will be able to customise the name(s) on your certificate(s) and download them directly."
        },
        friend: {
          text: "Adopt a {item} as a gift",
          tooltip: "Your recipient(s) will receive a gift code, on the date of your choice, allowing them to choose the name on their certificate(s) and download them directly."
        },
        company: "I am a company"
      }
    },
    customization: {
      title: {
        indonesia: "Name your {item} | Name your {item}",
        spain: "Customise your certificate | Customise your certificates",
        default: "Customise your certificate | Customise your certificates"
      },
      description: {
        indonesia: "Give your adopted {item} a name, you can choose the name you wish! |Give your adopted {item} a name, you can choose the names you wish",
        spain: "Choose the name you wish! | Choose the names you wish!"
      },
      input: {
        label: {
          indonesia: "Name of your {item} | Certificate n°{number}",
          spain: "Customised name for your certificate | Certificate n°{number}"
        },
        placeholder: {
          indonesia: "Name of your {item}",
          spain: "Name on your certificate"
        }
      },
      downloadCsv: {
        label: "By clicking on the button below, you will download a file that will allow you to customise your certificates' names.<br>Once you have filled it in, you can send the file to us by email.",
        btnLabel: "Download the Excel file"
      }
    },
    customizationSend: {
      message: {
        description: "You can write a message to your recipients.<br>This message will be common to all recipients.",
        placeholder: "Your message"
      },
      send: {
        description: "You can schedule the gift vouchers to be sent to your recipients at a later date. The email will be sent on the morning of the day you choose. <br>If you do not schedule delivery, the gift codes will be sent at the end of your order.",
        checkbox: "I wish to choose at which date my gift code is sent"
      }
    },
    donation: {
      title: {
        indonesia: "Support Coral Guardian",
        spain: "Support the project Deep CORE"
      },
      description: "Every donation counts! Take part in restoring coral reef ecosystems.",
      buttons: {
        unique: "Donate once",
        recurrent: "Donate monthly"
      },
      i_want: "I would like to donate",
      select_duration: {
        unique: "once",
        recurrent: "monthly"
      },
      amount: "for an amount of",
      other_amount: "other",
      fiscal_reduction: " <b>{reducedPrice} €</b> after tax deduction in France."
    },
    friend: {
      title: "Fill in your recipient's information",
      form: {
        firstname: "First name",
        name: "Surname",
        mail: "Email",
        message: "Your message"
      }
    },
    setup: {
      adopt: "Adopt",
      offer: "Gift",
      donation: "Donate",
      tooltips: {
        me: "You will be able to customise the name(s) on your certificate(s) and download them directly.",
        recipient: "Your recipient will receive a gift code, on the date of your choice, allowing them to choose the name on their certificate(s) and download it directly.",
        donation: "Donate once or every month the amount of your choice."
      },
      switch: {
        donation: {
          text: "You can also make a donation",
          link: "https://www.coralguardian.org/en/donate/"
        },
        individual: {
          text: "Are you an individual?",
          link: "https://www.coralguardian.org/en/adopt-a-coral/"
        },
        company: {
          text: "Are you a company?",
          link: "https://www.coralguardian.org/en/csr-coral-guardian/"
        }
      }
    },
    gift: {
      title: "Your gift",
      description: "Did someone adopt a gift for you?<br>To name it, enter the gift code you received by email.",
      input: {
        label: "Gift code",
        placeholder: "Your gift code"
      }
    },
    information: {
      title: "Please provide us with the following information",
      description: "The requested information is used for the sole purpose of editing your tax receipt.",
      required: "Fields marked with * are mandatory.",
      company: {
        cols: {
          information: {
            siret: "Company ID or SIRET",
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
          postalCode: "Postcode",
          city: "Town",
          country: "Country"
        }
      }
    },
    monthlyDonation: {
      description: "Ensure the evolution of the restoration area with a monthly donation which will help us continue to protect, restore, and raise awareness."
    },
    namingAdoption: {
      no_idea: {
        individual: "I don't have any inspiration, so I'll choose the name later. I'll receive an email with all the instructions to name my coral.",
        company: "I don't have any inspiration, so I'll choose the name later. I'll receive an email with all the instructions to name my coral.<br>It will be possible to import an Excel file."
      },
      description: {
        indonesia: "Choose a name for your adopted {item}, you can choose the name you wish! |Choose a name for your adopted {item}, you can choose the names you wish!",
        spain: "Choose the name you wish! | Choose the names you wish!",
        company: "You have two options:"
      },
      tabs: {
        fields: {
          title: "Fill in the fields"
        },
        file: {
          title: "Send a file",
          description: "Download the Excel file provided. Once completed, you can go to the address given in your confirmation email, and deposit your file in the field provided.",
          button: "Download the Excel file",
          upload: {
            label: "Your file",
            description: "Submit your completed Excel sheet with the names you have chosen here:"
          }
        }
      }
    },
    multipleRecipient: {
      title: "Who are you gifting this {item} to? | Who are you gifting this {item} to?",
      description: "Fill in the details of your recipients so that they can receive their respective gift codes.",
      tabs: {
        fields: {
          title: "Fill in the fields",
          description: "I wish to fill in the details of each of my recipients in the fields below:",
          recipient: "Recipient n°{index}"
        },
        file: {
          title: "Send a file",
          upload: {
            label: "Your file",
            description: "Upload your recipient Excel file here:"
          }
        }
      }
    },
    payment: {
      checking: "Your payment is being checked.",
      methods: {
        card: {
          tab: "Card",
          button: "I wish to pay by card"
        },
        bank: {
          tab: "Bank transfer",
          title: "Download Coral Guardian's bank details",
          description: "To pay by bank transfer, download our bank details and make the payment via your bank.",
          hint: "A processing time of 2 to 5 days is to be expected while we validate your payment. Once validated, you will receive an email allowing you to continue your order."
        }
      },
      donation: {
        description: "To complete your adoption, support our daily actions with an optional monthly donation <b>from 2€</b>!",
        label: "My monthly donation"
      },
      title: "Proceed to payment",
      important: "IMPORTANT: when validating your payment on your bank's mobile application, the amount displayed will be 0€. This is simply a request for bank pre-authorization but the amount debited corresponds to the total amount of your order indicated above.",
      errors: {
        card: "Please provide your payment details"
      }
    },
    project: {
      spain: "Mediterranean Sea, Spain",
      indonesia: "Flores Sea, Indonesia",
      tooltips: {
        spain: "📍 At Punta de la Mona, in Spain<br>🤝 In collaboration with the local nonprofit Coral Soul<br>⚠️ High levels of pollution in the Mediterranean<br>🌊 Actions to restore the coral ecosystem, clean the seabed, monitor and analyse the area scientifically, and raise local awareness",
        indonesia: "📍 At Pulau Hatamin, in Indonesia<br>🤝 In collaboration with the local nonprofit WES<br>⚠️ Dynamite fishing<br>🌊 Coral reef restoration actions, protection of the marine protected area, scientific monitoring of the area, and raise local awareness"
      }
    },
    finalStep: {
      title: "Well done and thank you!"
    },
    finalAdoption: {
      hint: "You have adopted {count} {item}!",
      download: "Download the certificate | Download certificates",
      download_description: "You can also download your certificate directly. | You can also download your certificates directly.",
      description_not_named: "Your tax receipt has been emailed to you. To obtain your certificate, name your {item} via the link in the email you will receive.| Your tax receipt has been emailed to you. To obtain your certificates, name your {item} via the link in the email you will receive."
    },
    finalFriendGift: {
      title: "Congratulations and thank you, you have adopted {count} {item}!",
      description: "Your certificate of adoption has been sent to you by email. You can also download it directly by clicking <a href='{link}' target='_blank'>here</a>.| Your adoption certificates have been sent to you by email. You can also download them directly by clicking <a href='{link}' target='_blank'>here</a>.",
      descriptionNoEmail: "You can download your certificate directly by clicking <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>here</a>."
    },
    finalDonation: {
      hint: "You have made a donation {type} of {price}€",
      title: "Congratulations and thanks for your support",
      description: "Your tax receipt will be sent to you by email.<br><br>Do you wish to receive news of all our actions and projects? Subscribe to our newsletter right <a href='/en/newsletter-coral-guardian/'>here</a>!<br>For any question, write to us at <a href='mailto:info@coralguardian.org'>info@coralguardian.org</a>",
      bankTransfer: "Your transfer is pending. Once validated, you will receive an email with your tax receipt."
    },
    finalRecurrentDonation: {
      title: "Congratulations and thank you for your monthly donation",
      description: "Your tax receipt summarising all your donations for the current fiscal year will be sent to you by email next January.<br><br>Do not hesitate to subscribe to our newsletter <a href='/en/newsletter-coral-guardian/'>here</a> to receive news on the progress of our projects every month."
    },
    finalRecipient: {
      hint: "You have gifted {count} {item}!",
      description: {
        base: "Your tax receipt has been sent to you by email.<br>The gift codes have been sent to your recipients.",
        later: "Your tax receipt has been emailed to you.<br>To fill in your recipients' details and enable them to receive their gift code, follow the link in the email.",
        sendToMe: "Your tax receipt has been sent to you by email as well as your gift codes.<br>Your recipients will be able to customise their gift on our website!",
        scheduled: "Your tax receipt has been sent to you by email.<br>The gift codes will be sent to your recipients on your chosen date!"
      },
      description2: "If you have chosen to send us the names of your recipients using the file provided, you can fill it in and send it back to us at the address indicated in the confirmation email you just received."
    },
    finalDeposit: {
      adoption: {
        description: "Your certificates have been sent to you by email.",
        download: "You can also download them directly. | You can also download them directly."
      },
      recipient: {
        description: {
          base: "The gift code has been sent to your recipient. | The gift codes have been sent to your recipients.",
          scheduled: "The gift code will be sent to your recipient on the scheduled date. | Gift codes will be sent to your recipients on the scheduled date."
        }
      }
    }
  },
  errors: {
    base: "An error occurred, please try again later.",
    already_named: "This code has already been used to name the adopted {item}.",
    order_incompatible_type: "This code doesn't seem to correspond to the related adoption.",
    invalid_type: "This code does not correspond to any coral adoption.",
    download_file: "Please download the file before continuing.",
    wrong_token: "The order number appears to be invalid. If the problem persists, please contact us directly.",
    select_date: "Please select a date if you wish to specify the sending date.",
    incorrect_file_data: "The data in the file seems incorrect, please check your information and try again.",
    code_not_found: "The gift code seems to be invalid. If the problem persists, please contact us directly.",
    adoption_not_found: "An error occurred while retrieving your adoption, please contact us directly."
  },
  donation: {
    monthly: {
      description: "Support our daily actions for coral reefs with a monthly donation!"
    },
    dialog: {
      activation: "Why donate monthly?",
      title: "How are your donations used?",
      button: "Back",
      chart: {
        description: "If each person who adopts a coral donated 2€ per month to Coral Guardian, it would allow us to continue our various conservation, awareness and scientific monitoring activities for years.",
        labels: {
          program: "Marine conservation programmes",
          awareness: "Outreach programmes",
          science: "Research",
          communication: "Communication",
          fundraisingCosts: "Fundraising costs",
          managementCosts: "Administration fees"
        }
      }
    }
  },
  newsletter: {
    title: "Subscribe to our newsletter",
    label: {
      adoption: "I would like to subscribe to news linked to my adoption.",
      donation: "Receive news <b>linked to your donation</b> and the progress of Coral Guardian's projects.<br>I would like to receive news from Coral Guardian."
    },
    otherEmail: {
      description: "If you wish to sign up with <b>another email address</b> than the one entered in the form, please fill in the field below.",
      email: "Email"
    }
  },
  giftCustom: {
    title: "Gift code sending options*",
    radios: {
      dont: "I wish to receive the gift code(s) on my email address",
      send: "I want to fill in the email addresses of the recipient(s) so that they receive their code directly (importing a contact file is possible)",
      later: {
        individual: "I'd like to fill in my recipients' email addresses later. I will receive an email with all the details.",
        company: "I would like to enter the email addresses of my recipients later. I will receive an email with all the details (importing a contact file is possible)."
      }
    }
  }
}
