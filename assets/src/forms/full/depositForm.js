import AbstractForm from "../abstractForm";
import Step from "@/forms/Step";
import OrderTypeEnum from "@/enums/orderTypeEnum";
import ProductEnum from "@/enums/productEnum";
import AdopterEnum from "@/enums/adopterEnum";
import ProjectEnum from "@/enums/projectEnum";

export default class DepositForm extends AbstractForm {

  beforeLoad(context) {
    return new Promise((resolve) => {
      // appel api pour récupérer les infos de l'adoption

      // mock
      let data = {
        order: {
          type: OrderTypeEnum.gift,
          productType: ProductEnum.coral,
          quantity: 1
        },
        adopter: {
          type: AdopterEnum.company
        },
        project: ProjectEnum.indonesia
      }

      // let data = {
      //   order: {
      //     type: OrderTypeEnum.regular,
      //     productType: ProductEnum.coral,
      //     quantity: 3
      //   },
      //   adopter: {
      //     type: AdopterEnum.company
      //   },
      //   project: ProjectEnum.indonesia
      // }

      context.dispatch('updateForm', data).then(() => resolve())
    })
  }

  steps = [
    new Step(
      "default.stepper.customization.title.default",
      null,
      "NamingAdoptionStep",
      (state) => state.data.order.type === OrderTypeEnum.regular,
      true,
      false,
      false,
      false
    ),
    new Step(
      null,
      null,
      "RecipientCustomizationStep",
      (state) => state.data.order.type === OrderTypeEnum.gift,
      true,
      false,
      true,
      false
    ),
    new Step(
      null,
      null,
      "FinalAdoptionStep",
      (state) => state.data.order.type === OrderTypeEnum.regular,
      false,
      false,
      false,
      false,
      {method: "get", endpoint: "getCertificates"},
      false,
      true
    ),
    new Step(
      null,
      null,
      "FinalRecipientStep",
      (state) => state.data.order.type === OrderTypeEnum.gift,
      false,
      false,
      false,
      false,
      null,
      false,
      true
    )
  ]
}
