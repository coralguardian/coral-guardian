import AbstractEnum from "@/enums/abstractEnum";

export default class PaymentStatusEnum extends AbstractEnum {
  static succeeded = "succeeded";
  static processing = "processing";
  static requires_payment_method = "requires_payment_method";
  static error = "error";
}
