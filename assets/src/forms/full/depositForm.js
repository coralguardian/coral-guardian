import AbstractForm from "../abstractForm";
import Step from "@/forms/Step";
import OrderTypeEnum from "@/enums/orderTypeEnum";
import axios from "axios";
import {getAuthorizationHeader} from "@/helpers/functionHelper";
// import ProductEnum from "@/enums/productEnum";
// import AdopterEnum from "@/enums/adopterEnum";
// import ProjectEnum from "@/enums/projectEnum";

export default class DepositForm extends AbstractForm {

  beforeLoad(context) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(window.location.search)

      if (params.has("adoptionUuid") === false) {
        reject('adoption_not_found')
      } else {
        const uuid = params.get("adoptionUuid");
        axios.get("/wp-json/" + context.getters.getApiNamespace + "/adoption/" + uuid + "/details", getAuthorizationHeader())
          .then(resp => {
            let data = resp.data
            data.order.uuid = uuid
            context.dispatch('updateForm', data).then(() => resolve())
          })
          .catch(() => {
            reject('adoption_not_found')
          })
      }

      // mock
      // let data = {
      //   order: {
      //     uuid: "0bc9c12a-bb79-4af0-b59b-08a012857dc5",
      //     type: OrderTypeEnum.gift,
      //     productType: ProductEnum.coral,
      //     quantity: 1
      //   },
      //   adopter: {
      //     type: AdopterEnum.company
      //   },
      //   project: ProjectEnum.indonesia
      // }

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

      // context.dispatch('updateForm', data).then(() => resolve())
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
      true,
      false,
      null,
      false,
      false,
      'finalized'
    ),
    new Step(
      null,
      null,
      "RecipientCustomizationStep",
      (state) => state.data.order.type === OrderTypeEnum.gift,
      true,
      false,
      true,
      false,
      null,
      false,
      false,
      'finalized'
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
