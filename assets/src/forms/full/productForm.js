import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import AdoptionForm from "@/forms/full/adoptionForm";
import GiftForm from "@/forms/full/giftForm";
import AdoptionSetupStep from "@/forms/steps/AdoptionSetupStep";

export default class ProductForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve, reject) => {
      let state = context.state
      switch (state.data.target) {
        case adoptionHelper.me:
          context.dispatch('loadForm', new AdoptionForm(context.state.data.project))
            .then(() => resolve())
            .catch((err) => {
              reject(err)
            })
          break;
        case adoptionHelper.friend:
          context.dispatch('loadForm', new GiftForm())
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
    new AdoptionSetupStep()
  ]
}
