import GiftOrderModel from "@/models/giftOrderModel";
import OrderTypeEnum from "@/enums/orderTypeEnum";

export default class ProductOrderModel {
  constructor(data) {
    let product = {
      key: data.selectedProduct.key,
      quantity: data.order.quantity,
      project: data.project
    }

    if (data.selectedProduct.variant) {
      product.variant = data.selectedProduct.variant
    }

    if (data.order.type === OrderTypeEnum.regular) {
      product.selfAdoptionModel = {names: data.adoption.names}
    }

    if (data.order.type === OrderTypeEnum.gift) {
      product.giftModel = new GiftOrderModel(data)
    }

    return product
  }
}
