import AbstractForm from "../abstractForm";
import ProductEnum from "@/enums/productEnum";
import PaymentMethodEnum from "@/enums/paymentMethodEnum";
import BankTransferThanksForm from "@/forms/full/bankTransferThanksForm";
import RecipientFullForm from "@/forms/full/recipientFullForm";
import FinalGiftForm from "@/forms/full/finalGiftForm";

export default class GiftForm extends AbstractForm {

  nextForm() {
    return new Promise((resolve) => {
      if (context.state.data.order.payment_method.type === PaymentMethodEnum.bankTransfer) {
        context.dispatch("loadForm", new BankTransferThanksForm())
          .then(() => {
            resolve()
          })
      } else {
        context.dispatch("loadForm", context.state.data.adopter.send_to_friend ? new RecipientFullForm() : new FinalGiftForm())
          .then(() => {
            resolve()
          })
          .catch((err) => console.log(err))
      }
    })
  }

  unload(state) {
    return new Promise(resolve => {
      state.data.order.productType = null
      resolve()
    })
  }

  onload(state) {
    // cas d'une redirection de fichiers, on ne connait pas les produits et on n'en a pas besoin
    if (!state.products) {
      return
    }
    const products = state.products.filter(product => product.key === state.data.order.productType)
    const lowestPrice = Math.min(...products.map(product => product.price))
    state.data.order.price = lowestPrice
    state.data.baseElementPrice = lowestPrice
    state.data.selectedProduct = products[0]
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
      ignorable: true
    },
    {
      tab: {
        title: "default.stepper.header.payment",
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