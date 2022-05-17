export default class AdoptionModel {
  constructor(data) {
    let adoptees = []
    data.adoption.names.forEach(name => {
      adoptees.push({
        adoptee_name: name
      })
    })
    let model = {
      adoptees: adoptees,
      order: data.order.id,
    }

    if (data.order.giftCode) {
      model.gift_code = data.order.giftCode
    }

    return model;
  }
}