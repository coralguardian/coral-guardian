import AbstractEnum from "@/enums/abstractEnum";

export default class SendToFriendEnum extends AbstractEnum {
  static dont = false;
  static send = true;
  static later = 2;
}
