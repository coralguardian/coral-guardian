export default class GiftMessageModel {
  constructor(data) {
    return {
      adoption_uuid: data.order.uuid,
      message: data.gift.message,
      sendOn: data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null
    }
  }
}