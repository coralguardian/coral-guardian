import SendToFriendEnum from "@/enums/sendToFriendEnum";

export default class GiftOrderModel {
  constructor(data) {
    let model = {
      sendToFriend: data.adopter.send_to_friend === SendToFriendEnum.later ? true : data.adopter.send_to_friend
    }

    if (data.adopter.send_to_friend === SendToFriendEnum.send && data.gift.recipients.length) {

      let friends = []
      data.gift.recipients.forEach(recipient => {
        friends.push({
          friendFirstname: recipient.first_name,
          friendLastname: recipient.last_name,
          friendEmail: recipient.email,
        })
      })

      model.friends = friends
    }

    if (data.gift.message) {
      model.message = data.gift.message
    }

    if (data.gift.toSendOn) {
      model.sendOn = data.gift.toSendOn.replaceAll("-", "")
    }

    return model
  }
}
