import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import AdoptionForm from "@/forms/full/adoptionForm";
import Step from "@/forms/Step";
import GiftForm from "@/forms/full/giftForm";

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
    new Step(
      "default.stepper.header.full.adoption",
      1,
      "AdoptionSetupStep",
      (state) => {
        return state.data.order.productType === null
      },
      true,
      false,
      true,
      true
    )
  ]
}
