import i18n from "@/plugins/i18n";

export default class AdoptionModel {
  constructor(data) {
    let adoption = {
      customerUUID: data.adopter.id,
      adoptedProduct: data.order.productType === 'reef' ? data.specificType : data.order.productType,
      quantity: data.order.quantity,
      amount: data.order.price,
      lang: i18n.locale,
      paymentMethod: data.order.payment_method.type
    }

    if (data.order.type === "gift") {
      adoption.sendToFriend = data.adopter.send_to_friend !== null ? data.adopter.send_to_friend : true
    }

    return adoption
  }
}