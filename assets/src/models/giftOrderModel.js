import SendToFriendEnum from "@/enums/sendToFriendEnum";

export default class GiftOrderModel {
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
      message: data.gift.message,
      sendOn: data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null,
      sendToFriend: data.adopter.send_to_friend === SendToFriendEnum.later ? true : data.adopter.send_to_friend
    }
  }
}
