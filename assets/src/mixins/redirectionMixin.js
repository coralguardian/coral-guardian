import {mapActions} from "vuex";
import {isEmpty, merge} from "lodash";
import adoptionHelper from "../helpers/adoptionHelper";
import apiMixin from "./apiMixin";
import AdopterEnum from "@/enums/adopterEnum";
import ActionEnum from "@/enums/actionEnum";
import ProjectEnum from "@/enums/projectEnum";

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
      loadPaymentNextSteps: "loadPaymentNextSteps",
      loadFormSteps: "loadForm",
      forceUpdate: "forceUpdate"
    }),
    fillParams() {
      new URLSearchParams(window.location.search)
        .forEach((value, key) => {
          this.params[key] = value
        })
    },
    fillState() {
      if (isEmpty(this.params)) {
        this.fillParams()
      }
      let data = {}
      if (this.params.c && AdopterEnum.isValueValid(this.params.c)) {
        data = merge(data, {adopter: {type: this.params.c}})
      }
      if (this.params.action && ActionEnum.isValueValid(this.params.action)) {
        data = merge(data, {target: ActionEnum.getTarget(this.params.action)})
      }
      if (this.params.project && ProjectEnum.isValueValid(this.params.project)) {
        data = merge(data, {project: this.params.project})
      }
      return new Promise(resolve => {
        this.updateForm(data).then(() => resolve())
      })
    },
    handleRedirection() {
      if (isEmpty(this.params)) {
        this.fillParams()
      }
      if (!this.params.payment_intent_client_secret && !this.params.adoptionUuid && !this.params.step) {
        return false
      }
      return new Promise((resolve, reject) => {
        // Redirection paiement
        if (this.params.payment_intent_client_secret) {
          let data = localStorage.getItem(this.params.payment_intent_client_secret);
          if (data) {
            data = JSON.parse(data)
            this.forceUpdate(data).then(() => {
              resolve()
            })
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
                    step: 8,
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
                    step: 9,
                    recipient: {
                      type: 'file',
                      locked: true
                    }
                  }
                  this.updateForm({target: adoptionHelper.friend})
                    .then(() => this.loadSetupNextSteps()
                      .then(() => this.updateForm({order: {type: "gift"}, adopter: {send_to_friend: true}})
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