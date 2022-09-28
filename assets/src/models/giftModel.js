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
      adoptionUuid: data.order.uuid
    }
  }
}