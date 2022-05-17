import i18n from "../plugins/i18n";

export default class DonationModel {
  constructor(data) {
    return {
      project_key: data.donation.project_key,
      amount: data.donation.price,
      customer_id: data.adopter.id,
      type: data.donation.type,
      lang: i18n.locale,
      payment_method: data.donation.payment_method.type
    }
  }
}