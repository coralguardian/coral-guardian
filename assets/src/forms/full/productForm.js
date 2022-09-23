import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import AdoptionForm from "@/forms/full/adoptionForm";
import GiftForm from "@/forms/full/giftForm";

export default class ProductForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve, reject) => {
      let state = context.state
      switch (state.data.target) {
        case adoptionHelper.me:
        case adoptionHelper.friend:
          context.dispatch('loadForm', new AdoptionForm())
            .then(() => resolve())
            .catch((err) => {
              reject(err)
            })
          break;
        default:
          reject("Formulaire non trouvé")
      }
    })
  }

  unload(state) {
    return new Promise(resolve => {
      state.data.order.productType = null
      resolve()
    })
  }

  steps = [
    {
      tab: {
        title: "default.stepper.header.full.adoption"
      },
      component: "AdoptionSetupStep",
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.order.productType === null
      }
    }
  ]
}