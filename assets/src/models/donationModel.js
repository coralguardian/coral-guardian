import i18n from "../plugins/i18n";

export default class DonationModel {
  constructor(data) {
    return {
      amount: data.donation.price,
      customerUUID: data.adopter.id,
      donationRecurrency: data.donation.type,
      lang: i18n.locale,
      paymentMethod: data.donation.payment_method.type
    }
  }
}