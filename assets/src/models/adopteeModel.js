export default class AdopteeModel {
  constructor(data) {
    let adoptee = {
      names: data.adoption.names,
      adoptionUuid: data.order.uuid,
    }

    if (data.order.giftCode) {
      adoptee.giftCode = data.order.giftCode
    }

    return adoptee
  }
}