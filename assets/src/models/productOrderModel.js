import GiftOrderModel from "@/models/giftOrderModel";
import OrderTypeEnum from "@/enums/orderTypeEnum";
import DepositTypeEnum from "@/enums/depositTypeEnum";

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
      const names = data.adoption.type === DepositTypeEnum.fields ? data.adoption.names : []
      product.selfAdoptionModel = {names: names}
    }

    if (data.order.type === OrderTypeEnum.gift) {
      product.giftModel = new GiftOrderModel(data)
    }

    return product
  }
}
