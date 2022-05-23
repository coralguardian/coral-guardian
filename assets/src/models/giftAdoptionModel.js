import AdoptionModel from "@/models/adoptionModel";
import {merge} from "lodash";

export default class GiftAdoptionModel extends AdoptionModel {
  constructor(data) {
    let adoption = super(data);

    let friendsData = data.gift && data.gift.friends ? data.gift.friends : [data.friend];
    let friends = []

    friendsData.forEach(friend => {
      friends.push({
        friendFirstname: friend.first_name,
        friendLastname: friend.last_name,
        friendEmail: friend.email,
      })
    })

    return merge(adoption, {
      friends: friends,
      sendOn: data.gift && data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null,
      message: data.gift ? data.gift.message : data.friend.message
    })
  }
}