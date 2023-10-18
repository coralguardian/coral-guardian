
export default class RecipientDepositModel {
  constructor(data) {

    if (!data.gift.recipients.length) {
      console.error("Missing recipients")
      return
    }

    let model = {}

    let friends = []
    data.gift.recipients.forEach(recipient => {
      friends.push({
        friendFirstname: recipient.first_name,
        friendLastname: recipient.last_name,
        friendEmail: recipient.email,
      })
    })

    model.friends = friends

    if (data.gift.message) {
      model.message = data.gift.message
    }

    if (data.gift.toSendOn) {
      model.sendOn = data.gift.toSendOn.replaceAll("-", "")
    }

    return model
  }
}
