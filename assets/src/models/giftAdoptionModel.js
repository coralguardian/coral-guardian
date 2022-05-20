import AdoptionModel from "@/models/adoptionModel";
import {merge} from "lodash";

export default class GiftAdoptionModel extends AdoptionModel {
  constructor(data) {
    let adoption = super(data);
    return merge(adoption, {
      friendFirstname: data.friend.first_name,
      friendLastname: data.friend.last_name,
      friendEmail: data.friend.email,
      sendOn: data.gift && data.gift.toSendOn ? data.gift.toSendOn.replaceAll("-", "") : null,
      message: data.friend.message
    })
  }
}