export default class AdopteeModel {
  constructor(data) {
    let adoptee = {
      names: data.adoption.names,
      stripePaymentIntentId: data.order.stripePaymentIntentId,
    }

    if (data.order.giftCode) {
      adoptee.giftCode = data.order.giftCode
    }

    return adoptee
  }
}