export default class GiftModel {
  constructor(data) {
    let friends = []
    data.gift.recipients.forEach(recipient => {
      friends.push({
        friendFirstname: recipient.first_name,
        friendLastname: recipient.last_name,
        friendEmail: recipient.email,
      })
    })
    return {
      friends: friends,
      stripePaymentIntentId: data.order.stripePaymentIntentId,
      message: data.gift.message,
      sendOn: data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null
    }
  }
}