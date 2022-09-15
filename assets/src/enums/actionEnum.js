import AbstractEnum from "@/enums/abstractEnum";
import adoptionHelper from "@/helpers/adoptionHelper";

export default class ActionEnum extends AbstractEnum {
  static adoption = "adoption";
  static gift = "gift";
  static donation = "donation";


  static getTarget(value) {
    switch (value) {
      case this.adoption: {
        return adoptionHelper.me
      }
      case this.gift: {
        return adoptionHelper.friend
      }
      case this.donation: {
        return value
      }
      default: {
        throw "Cette valeur ne correspond à aucune action."
      }
    }
  }
}