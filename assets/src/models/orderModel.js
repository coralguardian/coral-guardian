import i18n from "../plugins/i18n";

export default class OrderModel {
  constructor(data) {
    return {
      product_key: data.order.productType === 'reef' ? data.specificType : data.order.productType,
      quantity: data.order.quantity,
      custom_amount: data.order.customAmount,
      customer_id: data.adopter.id,
      type: data.order.type,
      price: data.order.price,
      lang: i18n.locale,
      payment_method: data.order.payment_method.type
    }
  }
}