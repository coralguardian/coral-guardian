import OrderModel from "./orderModel";

export default class GiftOrderModel extends OrderModel {
  constructor(data) {
    let order = super(data);
    order.friend = data.friend;
    order.friend.quantity_offered = data.order.quantity;
    order.message = data.friend.message;
    delete order.friend.message;
    return order
  }
}