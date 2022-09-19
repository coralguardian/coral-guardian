import AbstractForm from "../abstractForm";
import ProductEnum from "@/enums/productEnum";

export default class AdoptionForm extends AbstractForm {

  unload(state) {
    return new Promise(resolve => {
      state.data.order.productType = null
      resolve()
    })
  }

  onload(state) {
    const products = state.products.filter(product => product.key === state.data.order.productType)
    const lowestPrice = Math.min(...products.map(product => product.price))
    state.data.order.price = lowestPrice
    state.data.baseElementPrice = lowestPrice

    if (products.length === 1) {
      state.data.selectedProduct = products[0]
    }
  }

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
      validate: true
    },
    {
      tab: {
        title: "default.stepper.header.bonusDonation"
      },
      // title: "default.stepper.payment.title",
      component: "PrePaymentDonationStep",
      validate: true,
      customValidation: true,
      ignorable: true
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
        endpoint: "createOrder"
      }
    }
  ]
}