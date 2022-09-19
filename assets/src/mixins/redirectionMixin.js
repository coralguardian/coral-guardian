import {mapActions} from "vuex";
import {isEmpty, merge} from "lodash";
import adoptionHelper from "../helpers/adoptionHelper";
import apiMixin from "./apiMixin";
import AdopterEnum from "@/enums/adopterEnum";
import ActionEnum from "@/enums/actionEnum";
import ProjectEnum from "@/enums/projectEnum";
import SetupForm from "@/forms/full/setupForm";
import AdoptionForm from "@/forms/full/adoptionForm";

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
      if (!this.params.payment_intent_client_secret && !this.params.stripePaymentIntentId && !this.params.step) {
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
        else if (this.params.stripePaymentIntentId && this.params.step) {
          this.loading = true
          let url = this.getGetUrlNoApiData(
            {
              stripePaymentIntentId: this.params.stripePaymentIntentId,
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
                  quantity: resp.data.quantity,
                  stripePaymentIntentId: this.params.stripePaymentIntentId
                }
              }
              if (types[1] !== undefined) {
                data.order.specificType = types[1]
              }
              let order
              let step
              switch (this.params.step) {
                // redirection fichier nommage adoption
                case "adoption": {
                  data = {
                    ...data,
                    adoption: {
                      type: 'file',
                      locked: true
                    },
                    target: adoptionHelper.me
                  }
                  order = {order: {type: "regular"}}
                  step = {step: 7}
                  break;
                }
                // redirection fichier nommage destinataire
                case "recipient": {
                  data = {
                    ...data,
                    recipient: {
                      type: 'file',
                      locked: true
                    },
                    target: adoptionHelper.friend
                  }
                  order = {order: {type: "gift"}, adopter: {send_to_friend: true}}
                  step = {step: 8}
                  break;
                }
                default: {
                  reject()
                }
              }
              this.updateForm(data)
                .then(() => this.loadFormSteps(new SetupForm())
                  .then(() => this.loadFormSteps(new AdoptionForm())
                    .then(() => this.updateForm(order)
                      .then(() => this.loadPaymentNextSteps()
                        .then(() => this.updateForm(step)
                          .then(() => resolve()))))))
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