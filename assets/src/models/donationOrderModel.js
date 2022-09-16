export default class DonationOrderModel {
  constructor(data) {
    return {
      amount: data.donation.price,
      donationRecurrency: data.donation.type,
      project: data.project
    }
  }
}