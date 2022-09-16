export default class ProductOrderModel {
  constructor(data) {
    return {
      key: data.selectedProduct.key,
      quantity: data.order.quantity,
      project: data.project
    }
  }
}