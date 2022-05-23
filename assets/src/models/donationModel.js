import i18n from "../plugins/i18n";

export default class DonationModel {
  constructor(data) {
    return {
      // project_key: data.donation.project_key,
      amount: data.donation.price,
      customerUUID: data.adopter.id,
      donationRecurrency: data.donation.type,
      lang: i18n.locale,
      paymentMethod: data.donation.payment_method.type
    }
  }
}