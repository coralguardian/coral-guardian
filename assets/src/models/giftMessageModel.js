export default class GiftMessageModel {
  constructor(data) {
    return {
      stripePaymentIntentId: data.order.stripePaymentIntentId,
      message: data.gift.message,
      sendOn: data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null
    }
  }
}