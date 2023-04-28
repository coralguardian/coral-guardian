import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import ProductForm from "@/forms/full/productForm";
import ActionEnum from "@/enums/actionEnum";
import Step from "@/forms/Step";
import OrderTypeEnum from "@/enums/orderTypeEnum";

export default class ProjectForm extends AbstractForm {

  nextForm(context) {
    return new Promise((resolve, reject) => {
        let state = context.state

        if (state.data.adopter.type === null ||
          state.data.target === null ||
          state.data.project === null) {
          throw "Les données nécessaires ne sont pas disponibles !"
        }

        switch (state.data.target) {
          case adoptionHelper.me:
            context.dispatch('loadProducts')
              .then(() => {
                context.dispatch('loadForm', new ProductForm())
                  .then(() => {
                    context.dispatch('updateForm', {order: {type: OrderTypeEnum.regular}})
                      .then(() => resolve())
                  });
              })
              .catch((err) => {
                console.error(err)
              })

            break;
          case adoptionHelper.friend:
            context.dispatch('loadProducts')
              .then(() => {
                context.dispatch('loadForm', new ProductForm())
                  .then(() => {
                    context.dispatch('updateForm', {order: {type: OrderTypeEnum.gift}})
                      .then(() => resolve())
                  })
              })
            break;
          default:
            reject("Formulaire non trouvé")
        }
      })
  }

  steps = [
    new Step(
      "default.stepper.header.project",
      1,
      "ProjectStep",
      (state) => {
        return state.data.project === null && state.data.target !== ActionEnum.donation
      },
      true,
      false,
      true,
      true
    )
  ]
}
