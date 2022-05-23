import {merge} from "lodash";

export default class CustomerModel {
  constructor(data) {
    let customer = {
      firstname: data.adopter.first_name,
      lastname: data.adopter.last_name,
      address: data.adopter.address,
      postalCode: data.adopter.postal_code,
      city: data.adopter.city,
      country: data.adopter.country,
      email: data.adopter.email,
      type: data.adopter.type,
      wantsNewsletter: data.adopter.wants_newsletter
    }

    if (data.adopter.type === "company") {
      merge(customer, {
        alternateNewsletterEmail: data.adopter.alternate_newsletter_email,
        companyName: data.adopter.company_name
      })
    }

    return customer
  }
}