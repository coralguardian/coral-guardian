import AbstractForm from "../abstractForm";
import ProductEnum from "@/enums/productEnum";

export default class AdoptionForm extends AbstractForm {

  steps = [
    {
      tab: {
        title: "default.stepper.header.adoption"
      },
      title: "default.stepper.adoption.title",
      component: "ReefAdoptionStep",
      display: (state) => {
        return state.data.order.productType === ProductEnum.reef
      }
    },
    {
      tab: {
        title: "default.stepper.header.adoption"
      },
      title: "default.stepper.adoption.title",
      component: "CoralAdoptionStep",
      display: (state) => {
        return state.data.order.productType === ProductEnum.coral
      }
    },
    {
      tab: {
        title: "default.stepper.header.information"
      },
      title: "default.stepper.information.title",
      component: "InformationStep",
      validate: true,
      api: {
        method: "post",
        endpoint: "customer"
      }
    },
    {
      tab: {
        title: "default.stepper.header.payment"
      },
      title: "default.stepper.payment.title",
      component: "PaymentStep",
      validate: true,
      customValidation: true,
      api: {
        method: "post",
        endpoint: "adoption"
      }
    }
  ]
}