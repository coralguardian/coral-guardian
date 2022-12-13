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
    through: "Passer cette étape"
  },
  rules: {
    required: "Ce champ est requis.",
    minLength: "Ce champ doit comporter {count} caractères minimum.",
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
  deduction: {
    description: "Je fais <b>un don</b> de {donation}€,<br><b>soit {deduction}€</b> après déduction fiscale en France."
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
      customizationSend: "Personnalisation de l'envoi",
      thanks: "Merci !"
    },
    adopterType: {
      individual: "Un particulier",
      company: "Une entreprise"
    },
    adoption: {
      title: "Adoptez un {item} | Adoptez des {item}",
      description: "<b>Pour {donation}€</b>, redonnez vie aux écosystèmes marins en danger.",
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
        max: "Vous souhaitez adopter plus de {max} {item} ? <a href='mailto:n.radouane@coralguardian.org'>Contactez-nous directement</a> !"
      },
      customAmount: {
        label: "Montant :",
        hint: "Le surplus de don sera utilisé pour soutenir l'ensemble de nos actions."
      }
    },
    adoptionSetup: {
      error: "Veuillez sélectionner un type d'adoption."
    },
    bankTransferThanks: {
      title: "Votre paiement par virement est en attente",
      description: "Dès que votre virement sera validé, vous recevrez un email contenant un lien vous permettant de continuer le processus d'adoption personnalisé.",
      seeYouSoon: "À très vite !"
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
        title: "Écrire un message",
        description: "Vous pouvez écrire un message à l'intention de vos destinataires.<br>Ce message sera commun à l'ensemble des destinataires.",
        placeholder: "Votre message"
      },
      send: {
        title: "Programmer l'envoi",
        description1: "Vous avez la possibilité de programmer l'envoi des bons cadeaux à vos destinataires à une date ultérieure. L'email sera envoyé le matin du jour sélectionné.",
        description2: "Si vous ne programmez pas l'envoi, les codes cadeaux seront envoyés immédiatement à la fin de la commande.",
        checkbox: "Je souhaite programmer mon envoi"
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
      }
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
      adopt: "J'adopte",
      offer: "J'offre",
      donation: "Je fais un don",
      tooltips: {
        me: "Vous pourrez choisir le(s) nom(s) sur votre certificat(s) et le(s) télécharger directement.",
        recipient: "Votre destinataire(s) recevra un code cadeau, à la date de votre choix, lui permettant de choisir le nom sur leur(s) certificat(s) et le(s) télécharger directement.",
        donation: "Je donne une fois ou tous les mois le montant de mon choix."
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
    multipleAdoption: {
      description: {
        indonesia: "Donnez un nom à votre {item} adopté, vous pouvez choisir celui que vous souhaitez ! |Donnez un nom à chacun de vos {item} adoptés, vous pouvez choisir ceux que vous souhaitez !",
        spain: "Vous pouvez choisir le nom que vous souhaitez ! | Vous pouvez choisir les noms que vous souhaitez !",
        company: "Deux solutions s'offrent à vous :"
      },
      tabs: {
        fields: {
          title: "Je remplis les champs",
          description: {
            indonesia: "Je renseigne chaque nom de {item} dans les champs ci-dessous :",
            spain: "Je renseigne chaque nom dans les champs ci-dessous :"
          }
        },
        file: {
          title: "J'envoie un fichier",
          subtitle: "J'ai beaucoup de certificats à nommer ? J'envoie un fichier avec les personnalisations.",
          description: "Je télécharge le fichier Excel mis à ma disposition. Une fois rempli, je me rends à l'adresse communiquée dans le mail de confirmation reçu et je dépose mon fichier dans le champ prévu à cet effet.",
          button: "Télécharger le fichier",
          upload: {
            label: "Votre fichier",
            description: "Déposez votre fichier Excel de noms complété ici :"
          }
        }
      }
    },
    multipleRecipient: {
      description: "Renseignez les coordonnées de vos destinataires afin qu'ils reçoivent leur code cadeau respectif.",
      company: "Deux solutions s'offrent à vous :",
      tabs: {
        fields: {
          title: "Je remplis les champs",
          description: "Je renseigne les coordonnées de chacun de mes destinataires dans les champs ci-dessous :",
          recipient: "Destinataire n°{index}"
        },
        file: {
          title: "J'envoie un fichier",
          subtitle: "J'envoie un fichier avec les coordonnées de mes destinataires",
          description: "Je télécharge le fichier Excel mis à ma disposition. Une fois rempli, je me rends à l'adresse communiquée dans le mail de confirmation reçu et je dépose mon fichier dans le champ prévu à cet effet.",
          button: "Télécharger le fichier",
          upload: {
            label: "Votre fichier",
            description: "Déposez votre fichier Excel de destinataires ici :"
          }
        }
      }
    },
    payment: {
      methods: {
        card: {
          tab: "Carte",
          button: "Je souhaite payer par carte"
        },
        bank: {
          tab: "Virement",
          button: "Télécharger le RIB",
          description: "Pour payer par virement bancaire, télécharger le RIB de l'association et procédez au paiement via votre établissement bancaire.",
          hint: "Un délai de traitement de 2 à 5 jours est à prévoir le temps de valider le paiement. Une fois validé, vous recevrez un email vous permettant de continuer votre commande."
        }
      },
      donation: {
        description: "Pour accompagner votre adoption, soutenez nos actions au quotidien avec un don mensuel optionnel <b>à partir de 2€</b> !",
        label: "Mon don mensuel"
      },
      title: "Procédez au paiement",
      description: "Le paiement est sécurisé avec Stripe 🔒",
      important: "IMPORTANT : lors de la validation de votre règlement sur l'application mobile de votre banque, le montant affiché sera de 0€. \n" +
        "Il s'agit d'une demande de pré-autorisation bancaire mais le montant prélevé correspond bien au montant total de votre commande indiqué ci-dessus.",
      reminder: {
        title: "Rappel de votre don",
        adoption: {
          description: {
            indonesia: "{count} {item} adopté sur l'île d'Hatamin en Indo-Pacifique : {price}€ | {count} {item} adoptés sur l'île d'Hatamin en Indo-Pacifique : {price}€",
            spain: "{count} {item} adopté à Punta de la Mona en Méditerranée : {price}€ | {count} {item} adoptés à Punta de la Mona en Méditerranée : {price}€"
          }
        },
        donation: {
          description: "Un don {item} : {price}€"
        }
      },
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
    finalAdoption: {
      title: "Bravo et merci, vous avez adopté {count} {item}",
      description: "Vous pouvez aussi directement télécharger le certificat en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.|Vous pouvez aussi directement télécharger les certificats en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.",
      description_no_certif: "Votre reçu fiscal a été envoyé par email. Vous recevrez votre certificat par email une fois que vous nous aurez retourné votre fichier de noms.| Votre reçu fiscal a été envoyé par email. Vous recevrez vos certificats par email une fois que vous nous aurez retourné votre fichier de noms.",
      description_file: "Votre reçu fiscal et votre certificat ont été envoyés par email.| Votre reçu fiscal et vos certificats ont été envoyés par email."
    },
    finalFriendAdoption: {
      title: "Bravo et merci, vous avez adopté {count} {item} pour votre destinataire",
      description: "Votre reçu fiscal a été envoyé par email.<br><br>Le code cadeau de votre destinataire est le suivant : {orderToken}<br><br>Il/elle recevra un email pour personnaliser votre cadeau !"
    },
    finalFriendGift: {
      title: "Bravo et merci, vous avez adopté {count} {item}",
      description: "Vous pouvez aussi directement le télécharger en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.| Vous pouvez aussi directement les télécharger en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>.",
      descriptionNoEmail: "Vous pouvez télécharger votre certificat directement en cliquant <a class='font-weight-bold text-decoration-underline' href='{link}' target='_blank'>ici</a>."
    },
    finalDonation: {
      title: "Bravo et merci pour votre soutien",
      description: "Votre reçu fiscal a été envoyé par email.",
      bankTransfer: "Votre virement est en attente de réception. Une fois celui-ci validé, vous recevrez un email contenant votre reçu fiscal."
    },
    finalRecurrentDonation: {
      title: "Bravo et merci pour votre don mensuel",
      description: "Votre reçu fiscal récapitulant l’ensemble de vos dons de l’année fiscale en cours vous sera envoyé par email au mois de janvier prochain."
    },
    finalRecipient: {
      title: "Bravo et merci, vous avez adopté {count} {item} pour votre destinataire | Bravo et merci, vous avez adopté {count} {item} pour vos destinataires",
      description: {
        base: "Votre reçu fiscal vous a été envoyé par email.<br>Les codes cadeaux ont été envoyés à vos destinataires.",
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
    title: "Petit bonus : inscrivez-vous à notre newsletter !",
    description: {
      adoption: "Recevez des nouvelles liées à votre adoption et de l'avancée des projets de Coral Guardian.",
      other: "Recevez des nouvelles de l'avancée de nos projets tous les mois."
    },
    label: {
      adoption: "Je souhaite m'inscrire aux nouvelles envoyées par Coral Guardian.",
      other: "Je souhaite m'inscrire à la newsletter mensuelle de Coral Guardian."
    },
    otherEmail: {
      description: "Si vous souhaitez vous inscrire avec <b>une autre adresse email</b> que celle renseignée dans le formulaire, merci de renseigner le champ ci-dessous.",
      email: "Email"
    }
  },
  giftCustom: {
    title: "Options d'envoi des codes cadeaux*",
    radios: {
      dont: "Je souhaite recevoir le(s) code(s) cadeau(x) sur mon adresse email",
      send: "Je souhaite renseigner les adresses emails du ou des destinataire(s) afin qu'il(s) reçoive(nt) leur code directement (l'import d'un fichier de contact est possible)"
    }
  }
}
