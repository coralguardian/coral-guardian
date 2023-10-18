export default class AdopteeDepositModel {
  constructor(data) {
    let model = {
      names: data.adoption.names,
    }

    if (data.order.giftCode) {
      model.giftCode = data.order.giftCode
    }

    return model
  }
}
