export default class AdopteeModel {
  constructor(data) {
    return {
      names: data.adoption.names,
      adoptionUuid: data.order.uuid,
    }
  }
}