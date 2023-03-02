import ActionEnum from "@/enums/actionEnum";

export default class GtagService {

  executeTag(element, mode, adopter) {
    let item_category = '';
    let item_name = '';
    if (mode !== "adoption") {
      item_category = element.type
      item_name = 'donation';
    } else {
      if (element.type === ActionEnum.gift) {
        item_name = 'gift';
      } else {
        item_name = 'adoption';
      }
    }
    // eslint-disable-next-line
    gtag('event', 'purchase', {
      transaction_id: '',
      value: element.price,
      currency: "EUR",
      item_category: item_category,
      item_category2: adopter.type,
      item_name: item_name
    });
    return false;
  }
}
