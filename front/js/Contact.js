/**
 * Contact as the responsibility to hold the data related to the personal
 * information of the customer, when an order is passed.
 */
export default class Contact {
    constructor(
        firstName,
        lastName,
        address,
        city,
        email
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.city = city
        this.email = email
    }
}