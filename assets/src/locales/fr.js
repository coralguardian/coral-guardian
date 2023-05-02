export default {
  coral: "corail | coraux",
  reef: {
    base: "récif | récifs",
    lady: "récif Demoiselle Bleue | récifs Demoiselle Bleue",
    butterfly: "récif Poisson-papillon | récifs Poisson-papillon",
    napoleon: "récif Napoléon | récifs Napoléon",
    tooltip: "Un récif est composé de plusieurs coraux.<br>Vous pourrez adopter un récif de 30, 75 ou 150 coraux."
  },
  gift: "cadeau",
  oneshot: "ponctuel",
  monthly: "mensuel",
  ui: {
    continue: "Continuer",
    previous: "Précédent",
    through: "Passer cette étape",
    pay: "Payer et terminer",
    finalized: "Finaliser"
  },
  rules: {
    required: "Ce champ est requis.",
    minLength: "Ce champ doit comporter {count} caractères minimum.",
    maxLength: "Ce champ doit comporter {count} caractères maximum.",
    email: "Email non valide",
    specialChar: "Caractère(s) non admis.",
    digitOnly: "Ce champ ne doit comporter que des chiffres.",
    minValue: "Ce champ doit être supérieur à {min}."
  },
  stripe: {
    payment: {
      success: "Votre paiement a été réalisé avec succès !",
      processing: "Votre paiement est en cours de validation.",
      error: "Une erreur est survenue, veuillez réessayer.",
      refused: "Votre paiement a été refusé, veuillez réessayer."
    }
  },
  breadcrumb: {
    base: "Merci ! Vous souhaitez <b>{type}</b> un corail ou un récif.",
    project: "Merci ! Vous souhaitez <b>{type}</b> un corail ou un récif en <b>{project}</b>.",
    product: "Merci ! Vous souhaitez <b>{type}</b> un <b>{product}</b> en <b>{project}</b>.",
    price: "Merci ! Vous souhaitez <b>{type} {quantity} {product}</b> en <b>{project}</b> pour <b>{price}€</b>.",
    monthlyDonation: "Vous avez généreusement ajouté un <b>don mensuel de {donation}€</b>.",
    types: {
      regular: "adopter",
      gift: "offrir"
    }
  },
  share: 'Partagez sur',
  deduction: {
    description: "Je fais <b>un don {type}</b> de {donation} €, <b>soit {deduction} €</b> après déduction fiscale en France."
  },
  stepper: {
    header: {
      adopterType: "Vous êtes ?",
      adoption: "Adoption",
      bonusDonation: "Soutenez nos actions au quotidien",
      customization: "Personnalisation",
      donation: "Don",
      information: "Informations",
      payment: "Paiement",
      project: "Quel projet souhaitez-vous soutenir ?",
      friend: "Votre destinataire",
      recipients: "Destinataires",
      gift: "Cadeau",
      full: {
        setup: "Que souhaitez-vous faire ?",
        adoption: "Que souhaitez-vous adopter ?"
      },
      customizationSend: "Personnalisez votre envoi",
      thanks: "Merci !"
    },
    adopterType: {
      individual: "Un particulier",
      company: "Une entreprise"
    },
    adoption: {
      title: "Choisissez un nombre de {item}",
      description: "Vous redonnez vie aux écosystèmes marins en danger si vous faites un <b>don</b> de {donation} €, <b>soit {reducedPrice} €</b> après déduction fiscale en France.",
      corals: {
        hint: {
          individual: "Adopter un récif entier à partir de 30 coraux sur notre page dédiée \"<a href='/adopter-un-recif-particuliers/'>Adopter un récif</a>\" !",
          company: "Adopter un récif entier à partir de 30 coraux sur notre page dédiée \"<a href='/adoptez-un-recif-entreprises/'>Adopter un récif</a>\" !"
        }
      },
      reef: {
        lady: {
          title: "Demoiselle Bleue",
          description: "Récif Demoiselle Bleue de <b>30 coraux</b> (base de 900€)"
        },
        butterfly: {
          title: "Poisson-papillon",
          description: "Récif Poisson-papillon de <b>75 coraux</b> (base de 2250€)"
        },
        napoleon: {
          title: "Napoléon",
          description: "Récif Napoléon de <b>150 coraux</b> (base de 4500€)"
        },
        max: "Vous souhaitez adopter plus de {max} {item} ?<br><a href='mailto:n.radouane@coralguardian.org'>Contactez-nous directement</a> !"
      },
      customAmount: {
        label: "Montant",
        hint: "Le surplus de don sera utilisé pour soutenir l'ensemble de nos actions."
      },
      quantity: {
        label: "Quantité",
        hint: "Le surplus de don sera utilisé pour soutenir l'ensemble de nos actions."
      }
    },
    adoptionSetup: {
      error: "Veuillez sélectionner un type d'adoption."
    },
    bankTransferThanks: {
      hint: "Votre paiement par virement est en attente",
      description: "Dès que votre virement sera validé, vous recevrez un email contenant un lien vous permettant de continuer le processus d'adoption personnalisé.",
      seeYouSoon: "À très vite !"
    },
    bonusDonation: {
      title: "Optionnel : soutenez nos actions au quotidien"
    },
    certificate: {
      gift: {
        email: "Votre certificat d'adoption vous sera envoyé par email d'ici une quinzaine de minutes.| Vos certificats d'adoption vous seront envoyés par email d'ici une quinzaine de minutes."
      },
      adoption: {
        email: "Votre reçu fiscal et votre certificat d'adoption vous seront envoyés par email d'ici une quinzaine de minutes. | Votre reçu fiscal et vos certificats d'adoption vous seront envoyés par email d'ici une quinzaine de minutes."
      }
    },
    choice: {
      title: "C’est parti pour adopter un {item} !",
      buttons: {
        me: {
          text: "J'adopte un {item}",
          tooltip: "Vous pourrez choisir le(s) nom(s) sur votre certificat(s) et le(s) télécharger directement."
        },
        friend: {
          text: "J'offre l'adoption d'un {item}",
          tooltip: "Votre destinataire recevra un code cadeau, à la date de votre choix, lui permettant de choisir le nom sur leur(s) certificat(s) et le(s) télécharger directement."
        },
        company: "Je suis une entreprise"
      }
    },
    customization: {
      title: {
        indonesia: "Nommez votre {item} | Nommez vos {item}",
        spain: "Personnalisez votre certificat | Personnalisez vos certificats",
        default: "Personnalisez votre certificat | Personnalisez vos certificats"
      },
      description: {
        indonesia: "Donnez un nom à votre {item} adopté, vous pouvez choisir celui que vous souhaitez ! |Donnez un nom à chacun de vos {item} adoptés, vous pouvez choisir ceux que vous souhaitez !",
        spain: "Vous pouvez choisir le nom que vous souhaitez ! | Vous pouvez choisir les noms que vous souhaitez !"
      },
      input: {
        label: {
          indonesia: "Nom de votre {item} | Certificat n°{number}",
          spain: "Nom personnalisé de votre certificat | Certificat n°{number}"
        },
        placeholder: {
          indonesia: "Nom de votre {item}",
          spain: "Nom de votre certificat"
        }
      },
      downloadCsv: {
        label: "En cliquant sur le bouton suivant vous pourrez télécharger un fichier Excel afin de personnaliser les noms sur vos certificats.<br>Une fois rempli vous pourrez nous le renvoyer par email.",
        btnLabel: "Télécharger votre fichier Excel"
      }
    },
    customizationSend: {
      message: {
        description: "Vous pouvez écrire un message <b>commun</b> à l'intention de vos destinataires.",
        placeholder: "Votre message"
      },
      send: {
        description: "Vous avez la possibilité de programmer l'envoi des bons cadeaux à vos destinataires à une date ultérieure. L'email sera envoyé le matin du jour sélectionné. " +
          "<br>Si vous ne programmez pas l'envoi, les codes cadeaux seront envoyés à la fin de votre commande.",
        checkbox: "Programmez votre envoi"
      }
    },
    donation: {
      title: {
        indonesia: "Soutenez Coral Guardian",
        spain: "Soutenez le projet Deep CORE"
      },
      description: "Si vous le pouvez, privilégiez le don mensuel même modeste à un don ponctuel plus important afin de nous aider à planifier nos actions dans le temps.",
      buttons: {
        unique: "Je donne une fois",
        recurrent: "Je donne tous les mois"
      },
      i_want: "Je souhaite donner",
      select_duration: {
        unique: "une fois",
        recurrent: "tous les mois"
      },
      amount: "pour un montant de",
      other_amount: "autre"
    },
    friend: {
      title: "Renseignez les informations de votre destinataire",
      form: {
        firstname: "Prénom",
        name: "Nom",
        mail: "Email",
        message: "Votre message"
      }
    },
    setup: {
      adopt: "Adopter un corail ou un récif",
      offer: "Offrir un corail ou un récif",
      donation: "Je fais un don",
      tooltips: {
        me: "Vous pourrez choisir le(s) nom(s) sur votre certificat(s) et le(s) télécharger directement.",
        recipient: "Votre destinataire(s) recevra un code cadeau, à la date de votre choix, lui permettant de choisir le nom sur leur(s) certificat(s) et le(s) télécharger directement.",
        donation: "Je donne une fois ou tous les mois le montant de mon choix."
      },
      switch: {
        donation: "Vous pouvez aussi faire un don",
        individual: "Vous êtes un particulier ?",
        company: "Vous êtes une entreprise ?"
      }
    },
    gift: {
      title: "Votre cadeau",
      description: "Pour adopter votre cadeau et lui donner un nom, saisissez votre code cadeau reçu par email.",
      input: {
        label: "Code cadeau",
        placeholder: "Votre code cadeau"
      }
    },
    information: {
      title: "Renseignez vos informations",
      description: "Les informations demandées sont utilisées pour éditer votre reçu fiscal et pour procéder au paiement.",
      company: {
        cols: {
          information: {
            siret: "Numéro SIRET",
            companyName: "Nom de l'entreprise*",
            firstname: "Prénom du contact principal*",
            name: "Nom du contact principal*",
            mail: "Email du contact principal*"
          },
          contact: {
            address: "Adresse du siège*"
          }
        }
      },
      cols: {
        information: {
          title: "Informations",
          firstname: "Prénom*",
          name: "Nom*",
          mail: "Email*"
        },
        contact: {
          title: "Coordonnées",
          address: "Adresse*",
          postalCode: "Code postal*",
          city: "Commune*",
          country: "Pays*"
        }
      }
    },
    monthlyDonation: {
      description: "Assurez la poursuite de nos actions de recherche, de restauration et de sensibilisation au quotidien avec un don mensuel."
    },
    namingAdoption: {
      no_idea: {
        individual: "Je n’ai pas d’inspiration, je choisirai donc le nom plus tard. Je recevrai  un email avec toutes les indications pour nommer mon corail.",
        company: "Je n’ai pas d’inspiration, je choisirai donc le nom plus tard. Je recevrai  un email avec toutes les indications pour nommer mon corail.<br>L'importation d'un fichier excel sera possible."
      },
      description: {
        indonesia: "Donnez un nom à votre {item} adopté, vous pouvez choisir celui que vous souhaitez ! |Donnez un nom à chacun de vos {item} adoptés, vous pouvez choisir ceux que vous souhaitez !",
        spain: "Vous pouvez choisir le nom que vous souhaitez ! | Vous pouvez choisir les noms que vous souhaitez !",
        company: "Deux solutions s'offrent à vous :"
      },
      tabs: {
        fields: {
          title: "Je remplis les champs"
        },
        file: {
          title: "J'envoie un fichier",
          description: "Si vous avez beaucoup de {item} à nommer, téléchargez le fichier Excel ci-dessous.\n" +
            "Une fois dûment rempli, rendez-vous sur l’adresse communiquée dans l’email de confirmation que vous allez recevoir et importez le fichier.",
          button: "Télécharger le fichier Excel",
          upload: {
            label: "Votre fichier",
            description: "Déposez votre fichier Excel de noms complété ici :"
          }
        }
      }
    },
    multipleRecipient: {
      title: "À qui offrez-vous le {item} | À qui offrez-vous les {item}",
      description: "Renseignez les coordonnées de vos destinataires afin qu'ils reçoivent leur code cadeau respectif.",
      tabs: {
        fields: {
          title: "Remplir les champs",
          description: "Je renseigne les coordonnées de chacun de mes destinataires dans les champs ci-dessous :",
          recipient: "Destinataire n°{index}"
        },
        file: {
          title: "Importer un fichier",
          // subtitle: "J'envoie un fichier avec les coordonnées de mes destinataires",
          // description: "Je télécharge le fichier Excel mis à ma disposition. Une fois rempli, je me rends à l'adresse communiquée dans le mail de confirmation reçu et je dépose mon fichier dans le champ prévu à cet effet.",
          // button: "Télécharger le fichier",
          upload: {
            label: "Parcourir",
            description: "Importez ci-dessous votre fichier Excel dûment complété :"
          }
        }
      }
    },
    payment: {
      checking: "Votre paiement est en cours de vérification",
      methods: {
        card: {
          tab: "Carte",
          button: "Je souhaite payer par carte"
        },
        bank: {
          tab: "Virement",
          title: "Télécharger le RIB de Coral Guardian",
          description: "Procédez ensuite au paiement via votre établissement bancaire.",
          hint: "Un délai de traitement de 2 à 5 jours est à prévoir le temps de valider le paiement. Une fois validé, vous recevrez un email vous permettant de continuer votre commande."
        }
      },
      donation: {
        description: "Pour accompagner votre adoption, soutenez nos actions au quotidien avec un don mensuel optionnel <b>à partir de 2€</b> !",
        label: "Mon don mensuel"
      },
      title: "Enfin, procédez au paiement <span class='font-weight-regular cg-base-text'>(sécurisé avec Stripe)</span>",
      important: "<b>Important</b> : lors de la validation de votre règlement sur l'application mobile de votre banque, le montant affiché sera de 0€. \n" +
        "Il s'agit d'une demande de pré-autorisation bancaire mais le montant prélevé correspond bien au montant total de votre commande indiqué ci-dessus.",
      errors: {
        card: "Veuillez renseigner les informations de votre carte bancaire."
      }
    },
    project: {
      spain: "Mer Méditerranée, Espagne",
      indonesia: "Mer de Flores, Indonésie",
      tooltips: {
        spain: "📍 À Punta de la Mona, en Espagne<br>🤝 En collaboration avec l’association locale Coral Soul<br>⚠️ La pollution en Méditerranée<br>🌊 Actions de restauration des fonds coralliens, nettoyage des fonds marins, suivis et analyses scientifiques de la zone, et sensibilisation locale",
        indonesia: "📍 À Pulau Hatamin, en Indonésie<br>🤝 En collaboration avec l’association locale WES<br>⚠️ La pêche à la dynamite<br>🌊 Actions de restauration du récif corallien, protection de l’aire marine protégée, suivis scientifiques de la zone, et sensibilisation locale"
      }
    },
    finalStep: {
      title: "Bravo et merci !",
    },
    finalAdoption: {
      hint: "Vous avez adopté {count} {item} !",
      download: "Téléchargez le certificat | Téléchargez les certificats",
      download_description: "Vous pouvez aussi directement télécharger votre certificat. | Vous pouvez aussi directement télécharger vos certificats.",
      description_not_named: "Votre reçu fiscal a été envoyé par email. Pour obtenir votre certificat, nommez votre {item} via le lien présent dans l'email que vous allez recevoir.| Votre reçu fiscal a été envoyé par email. Pour obtenir vos certificats, nommez vos {item} via le lien présent dans l'email que vous allez recevoir.",
    },
    finalFriendGift: {
      title: "Bravo et merci, vous avez adopté {count} {item}",
      description: "Vous pouvez aussi directement le télécharger en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.| Vous pouvez aussi directement les télécharger en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.",
      descriptionNoEmail: "Vous pouvez télécharger votre certificat directement en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>."
    },
    finalDonation: {
      hint: "Vous avez fait un don {type} de {price}€",
      title: "Bravo et merci pour votre soutien",
      description: "Votre reçu fiscal a été envoyé par email.",
      bankTransfer: "Votre virement est en attente de réception. Une fois celui-ci validé, vous recevrez un email contenant votre reçu fiscal."
    },
    finalRecurrentDonation: {
      title: "Bravo et merci pour votre don mensuel",
      description: "Votre reçu fiscal récapitulant l’ensemble de vos dons de l’année fiscale en cours vous sera envoyé par email au mois de janvier prochain."
    },
    finalRecipient: {
      hint: "Vous avez offert {count} {item} !",
      description: {
        base: "Votre reçu fiscal vous a été envoyé par email.<br>Les codes cadeaux ont été envoyés à vos destinataires.",
        later: "Votre reçu fiscal vous a été envoyé par email.<br>Pour renseigner les informations de vos destinataires et leur permettre de recevoir leur code cadeaux, suivez le lien présent dans l'email.",
        sendToMe: "Votre reçu fiscal a été envoyé par email ainsi que l'ensemble des codes cadeaux.<br>En se rendant sur le site Coral Guardian, vos destinataires pourront personnaliser leur cadeau !",
        scheduled: "Votre reçu fiscal vous a été envoyé par email.<br>Les codes cadeaux seront envoyés à vos destinataires à la date programmée."
      },
      description2: "Si vous avez choisi de nous faire parvenir les noms de vos destinataires grâce au fichier à disposition, vous pouvez le remplir et nous le renvoyer à l'adresse inscrite dans l'email de confirmation que vous venez de recevoir."
    }
  },
  errors: {
    base: "Une erreur est survenue, veuillez réessayer ultérieurement.",
    already_named: "Ce code a déjà été utilisé.",
    order_incompatible_type: "Ce code ne semble pas correspondre à l'adoption souhaitée.",
    invalid_type: "Ce code ne correspond à aucune commande.",
    download_file: "Veuillez télécharger le fichier avant de continuer.",
    wrong_token: "Le numéro de commande semble invalide. Si le problème persiste, veuillez nous contacter directement.",
    select_date: "Veuillez sélectionner une date si vous souhaitez préciser la date d'envoi.",
    incorrect_file_data: "Les données du fichier semblent incorrectes, veuillez vérifier vos informations et réessayer.",
    code_not_found: "Le code cadeau semble invalide. Si le problème persiste, veuillez nous contacter directement.",
    adoption_not_found: "Une erreur est survenue lors de la récupération de votre adoption, veuillez nous contacter directement."
  },
  donation: {
    monthly: {
      description: "Continuez à soutenir nos actions au quotidien pour les océans avec un don mensuel !"
    },
    dialog: {
      activation: "À quoi sert votre don ?",
      title: "Comment sont utilisés vos dons à Coral Guardian ?",
      button: "J'ai compris",
      chart: {
        description: "Si chaque personne qui adopte un corail faisait don de 2€ par mois à Coral Guardian, cela nous permettrait de faire prospérer nos différentes actions de conservation, de sensibilisation, et de suivis scientifiques pendant des années.",
        labels: {
          program: "Programmes de conservation marine",
          awareness: "Sensibilisation",
          science: "Recherche",
          communication: "Communication",
          fundraisingCosts: "Frais de développement",
          managementCosts: "Frais d'administration"
        }
      }
    }
  },
  newsletter: {
    title: "Bonus optionnel",
    label: {
      adoption: "Je souhaite recevoir des nouvelles <b>liées à mon adoption</b> et à l'avancée des projets de Coral Guardian et m'inscris à la newsletter mensuelle.",
      donation: "Recevez des nouvelles <b>liées à votre don</b> et de l'avancée des projets de Coral Guardian.<br>Je souhaite m'inscrire aux nouvelles envoyées par Coral Guardian.",
    },
    otherEmail: {
      description: "Si vous souhaitez vous inscrire avec <b>une autre adresse email</b> que celle renseignée dans le formulaire, merci de renseigner le champ ci-dessous.",
      email: "Email"
    }
  },
  giftCustom: {
    title: "Pour envoyer le(s) code(s) cadeau(x)*",
    radios: {
      dont: "Je souhaite recevoir le(s) code(s) cadeau(x) sur mon adresse email",
      send: "Je souhaite renseigner les adresses emails du ou des destinataire(s) afin qu'il(s) reçoive(nt) leur code directement.",
      later:  {
        individual: "Je souhaite renseigner les adresses emails de mes destinataires plus tard. Je recevrai un email avec toutes les indications.",
        company: "Je souhaite renseigner les adresses emails de mes destinataires plus tard. Je recevrai un email avec toutes les indications (l'import d'un fichier de contact est possible).",
      }
    }
  }
}
