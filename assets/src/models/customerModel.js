export default class CustomerModel {
  constructor(data) {
    return {
      firstname: data.adopter.first_name,
      lastname: data.adopter.last_name,
      address: data.adopter.address,
      postalCode: data.adopter.postal_code,
      city: data.adopter.city,
      country: data.adopter.country,
      email: data.adopter.email,
      type: data.adopter.type
    }
  }
}