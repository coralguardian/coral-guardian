export default class GiftModel {
  constructor(data) {
    let friends = []
    data.gift.recipients.forEach(recipient => {
      friends.push({
        first_name: recipient.first_name,
        last_name: recipient.last_name,
        email: recipient.email
      })
    })
    return {
      friends: friends,
      order_id: data.order.id,
      message: data.gift.message,
      to_send_on: data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null
    }
  }
}