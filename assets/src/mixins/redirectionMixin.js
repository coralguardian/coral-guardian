import {mapActions} from "vuex";
import {isEmpty} from "lodash";
import adoptionHelper from "../helpers/adoptionHelper";
import apiMixin from "./apiMixin";

export default {
  mixins: [apiMixin],
  data() {
    return {
      params: {},
      loading: false
    }
  },
  methods: {
    ...mapActions({
      updateForm: "updateForm",
      loadSetupNextSteps: "loadSetupNextSteps",
      loadPaymentNextSteps: "loadPaymentNextSteps"
    }),
    fillParams() {
      new URLSearchParams(window.location.search)
        .forEach((value, key) => {
          this.params[key] = value
        })
    },
    handleRedirection() {
      if (isEmpty(this.params)) {
        this.fillParams()
      }
      return new Promise((resolve, reject) => {
        // Redirection paiement
        if (this.params.payment_intent_client_secret) {
          let data = localStorage.getItem(this.params.payment_intent_client_secret);
          if (data) {
            data = JSON.parse(data)
            this.updateForm({target: data.target})
              .then(() => this.loadSetupNextSteps()
                .then(() => {
                  // si on est sur une étape après le paiement de la commande
                  // on a payé un don
                  if (data.step > 5) {
                    this.updateForm({order: data.order})
                      .then(() => this.loadPaymentNextSteps()
                        .then(() => this.updateForm(data)
                          .then(() => resolve())))
                  } else {
                    this.updateForm(data).then(() => resolve())
                  }
                }))
          } else {
            reject()
          }
        }
        // redirection fichiers
        else if (this.params.adoptionUuid && this.params.step) {
          this.loading = true
          let url = this.getGetUrlNoApiData(
            {
              adoptionUuid: this.params.adoptionUuid,
              step: this.params.step
            },
            "adoption/redirection")
          this.getByUrl(url)
            .then(resp => {
              this.loading = false
              let types = resp.data.type.split(".")
              let data = {
                order: {
                  uuid: resp.data.uuid,
                  productType: types[0],
                  quantity: resp.data.quantity
                }
              }
              if (types[1] !== undefined) {
                data.order.specificType = types[1]
              }
              switch (this.params.step) {
                // redirection fichier nommage adoption
                case "adoption": {
                  data = {
                    ...data,
                    step: 6,
                    adoption: {
                      type: 'file',
                      locked: true
                    }
                  }
                  this.updateForm({target: adoptionHelper.me})
                    .then(() => this.loadSetupNextSteps()
                      .then(() => this.updateForm({order: {type: "regular"}})
                        .then(() => this.loadPaymentNextSteps()
                          .then(() => this.updateForm(data)
                            .then(() => resolve())))))
                  break;
                }
                // redirection fichier nommage destinataire
                case "recipient": {
                  data = {
                    ...data,
                    step: 6,
                    recipient: {
                      type: 'file',
                      locked: true
                    }
                  }
                  this.updateForm({target: adoptionHelper.friend})
                    .then(() => this.loadSetupNextSteps()
                      .then(() => this.updateForm({order: {type: "gift"}})
                        .then(() => this.loadPaymentNextSteps()
                          .then(() => this.updateForm(data)
                            .then(() => resolve())))))
                  break;
                }
                default: {
                  reject()
                }
              }
            })
            .catch(err => {
              this.loading = false
              reject(err)
            })
        }
      })
    },
    cleanUrl() {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }
}