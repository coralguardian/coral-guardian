import BaseFormStore from "../store/baseFormStore";
import AdopteeModel from "@/models/adopteeModel";
import AdoptionTypeEnum from "@/enums/adoptionTypeEnum";

const baseForm = new BaseFormStore()

export class BaseAdoptionFormStore {
  constructor(type, price) {
    const localType = type;
    const localPrice = price;
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
          // price: localPrice,
          target: null,
          // count: 1,
          adoption: {
            type: AdoptionTypeEnum.fields,
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
            ...baseForm.state.data.donation
          },
          selectedProduct: null
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
        }
      }
    }

    this.state = getDefaultState()

    this.getters = {
      ...baseForm.getters,
      getTarget: state => state.data.target,
      getCurrentStep: (state, getters) => {
        return getters.getSteps[state.data.step]
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
      setQuantity(state, quantity) {
        state.data.order.quantity = Number(quantity)
        state.data.order.price = Number(quantity) * state.data.baseElementPrice
      }
    };

    this.actions = {
      ...baseForm.actions,
      incrementCount(context) {
        context.commit('incrementCount')
      },
      decrementCount(context) {
        if (context.state.data.order.quantity > 0) {
          context.commit('decrementCount')
        }
      },
      setQuantity(context, data) {
        context.commit('setQuantity', data)
      }
    }
  }
}
