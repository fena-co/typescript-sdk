export class User {
  protected firstName?: string;
  protected lastName?: string;
  protected emailAddress?: string;
  protected phoneNumber?: string;

  constructor(firstName, lastName, emailAddress, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
  }

  setUserData(key: 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber', value: string) {
    this[key] = value;
  }

  public getFirstName() {
    return this.firstName;
  }

  public getLastName() {
    return this.lastName;
  }

  public getFullName() {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`
    } else if (this.firstName) {
      return this.firstName;
    } else {
      return this.lastName;
    }
  }

  public getEmailAddress() {
    return this.emailAddress;
  }

  public getPhoneNumber() {
    return this.phoneNumber;
  }
}
