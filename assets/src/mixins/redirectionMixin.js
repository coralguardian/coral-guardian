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
        else if (this.params.orderId && this.params.step) {
          this.loading = true

          this.post({order_id: this.params.orderId}, "getOrder")
            .then(resp => {
              this.loading = false
              let data = {
                order: {
                  id: resp.data.id,
                  quantity: resp.data.quantity,
                  productType: resp.data.type
                }
              }
              // cas des récifs
              if (resp.data.type !== resp.data.key) {
                data.order.specificType = resp.data.key
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