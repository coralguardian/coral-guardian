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

    return product
  }
}