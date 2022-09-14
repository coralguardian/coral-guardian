import BaseFormStore from "../store/baseFormStore";
import AdoptionModel from "../models/adoptionModel";
import GiftAdoptionModel from "../models/giftAdoptionModel";
import AdopteeModel from "@/models/adopteeModel";
import donationHelper from "@/helpers/donationHelper";

const baseForm = new BaseFormStore()

export class BaseAdoptionFormStore {
  constructor(type, price, max) {
    const localType = type;
    const localPrice = price;
    const localMax = max;
    const getDefaultState = () => {
      return {
        ...baseForm.state,
        data: {
          ...baseForm.state.data,
          baseElementPrice: localPrice,
          order: {
            ...baseForm.state.data.order,
            price: localPrice,
            productType: localType
          },
          // type: localType,
          max: localMax,
          // price: localPrice,
          target: null,
          // count: 1,
          adoption: {
            type: "fields",
            names: []
          },
          // pour l'étape de gestion des destinataires
          recipient: {
            type: "fields"
          },
          // names: [],
          friend: {
            first_name: "",
            last_name: "",
            email: "",
            message: ""
          },
          donation: {
            ...baseForm.state.data.donation,
            type: donationHelper.monthly
          }
        },
        baseForm: {
          tabs: [
            {
              visible: false,
              title: null
            }
          ],
          steps: [
            {
              title: "default.stepper.choice.title",
              component: "ChoiceStep",
              singularTitle: true,
              classes: "choice-step"
            }
          ]
        },
        forms: []
      }
    }

    this.state = getDefaultState()

    this.getters = {
      ...baseForm.getters,
      // getForm: state => {
      //   if (state.data.target === null) {
      //     return state.baseForm
      //   }
      //   let form = cloneDeep(state.forms.find(form => form.target === state.data.target))
      //   let baseForm = cloneDeep(state.baseForm);
      //   return mergeWith(baseForm, form, customizerMergeObjectWithArrays)
      // },
      getTarget: state => state.data.target,
      // count: state => state.data.count,
      getCurrentStep: (state, getters) => {
        return getters.getForm.steps[state.data.step]
      },
      getPostPaymentDataAdoption(state) {
        if (state.data.order.type === "gift") {
          return new GiftAdoptionModel(state.data)
        } else {
          return new AdoptionModel(state.data)
        }
      },
      getPaymentData: state => {
        return {
          count: state.data.count,
          price: state.data.price,
          customAmount: state.data.customAmount,
          donationAmount: state.data.donationAmount
        }
      },
      getPostAdoptionsData(state) {
        return new AdopteeModel(state.data)
      },
      getAdoption: state => state.data.adoption,
      getRecipient: state => state.data.recipient,
      getFriend: state => state.data.friend
    };

    this.mutations = {
      ...baseForm.mutations,
      incrementCount(state) {
        state.data.order.quantity++
        state.data.order.price = state.data.order.quantity * state.data.baseElementPrice
      },
      decrementCount(state) {
        state.data.order.quantity--
        state.data.order.price = state.data.order.quantity * state.data.baseElementPrice
      },
      resetState(state) {
        state.data.target = null
        state.data.order.quantity = 1
        state.data.order.price = state.data.baseElementPrice
        state.data.order.customAmount = false
      }
    };

    this.actions = {
      ...baseForm.actions,
      decrementStep(context) {
        if (context.state.data.step === 1) {
          context.commit('decrementStep')
          context.commit('resetState')
        } else if (context.state.data.step > 0) {
          context.commit('decrementStep')
        }
      },
      incrementCount(context) {
        context.commit('incrementCount')
      },
      decrementCount(context) {
        if (context.state.data.order.quantity > 0) {
          context.commit('decrementCount')
        }
      }
    }
  }
}
