import AbstractForm from "../abstractForm";
import adoptionHelper from "@/helpers/adoptionHelper";
import DonationForm from "@/forms/full/donationForm";
import donationHelper from "@/helpers/donationHelper";
import ProductForm from "@/forms/full/productForm";

export default class SetupForm extends AbstractForm {

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
                    context.dispatch('updateForm', {order: {type: 'regular'}})
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
                    context.dispatch('updateForm', {order: {type: 'gift'}})
                      .then(() => resolve())
                  })
              })
            break;
          case "donation":
            context.dispatch('loadForm', new DonationForm(context.state.data.project))
              .then(() => {
                context.dispatch('updateForm', {donation: {type: donationHelper.oneshot}})
                  .then(() => resolve())
              })
            break;
          default:
            reject("Formulaire non trouvé")
        }
      })
  }

  steps = [
    {
      tab: {
        title: "default.stepper.header.adopterType",
      },
      component: "AdopterTypeStep",
      display: (state) => {
        return state.data.adopter.type === null
      }
    },
    {
      tab: {
        title: "default.stepper.header.full.setup",
      },
      component: "SetupStep",
      larger: true,
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.target === null
      }
    },
    {
      tab: {
        title: "default.stepper.header.project",
      },
      component: "ProjectStep",
      validate: true,
      customValidation: true,
      display: (state) => {
        return state.data.project === null
      }
    }
  ]
}