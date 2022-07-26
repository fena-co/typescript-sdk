import {SDKConfig} from "./config";
import {Api} from "./api";
import {Payment} from "./payment";
import {User} from "./user";

export default class FenaPaymentSDK {
  protected config: SDKConfig;
  protected api: Api;

  constructor(integrationId: string, integrationSecret: string, type: 'merchant' | 'partner', demo=false) {
    this.config = new SDKConfig(integrationId, integrationSecret, type, demo);
    this.api = new Api(demo, this.config);
  }

  /**
   * Update configuration
   * @param id {string} - Integration ID
   * @param secret {string} - Integration secret
   */
  public updateIntegrationConfig(id: string, secret: string) {
    this.config.update(id, secret);
  }

  /**
   * Set the SDK to demo mode
   */
  public setToDemoMode() {
    this.api.setDemoMode(true);
  }

  /**
   * Set the SDK to production mode
   */
  public setToProductionMode() {
    this.api.setDemoMode(false);
  }

  /**
   * Create a payment to process it later
   * @param referenceNumber {string} - A unique reference number for your payment
   * @param amount {string} - Payment amount in format "00.00"
   * @param dueDate {string} - Due date in ISO format
   */
  public createPayment(referenceNumber: string, amount: string, dueDate: string) {
    return new Payment(referenceNumber, amount, dueDate);
  }

  /**
   * Create a user to later attach him to a payment
   * @param firstName {string} - First name
   * @param lastName {string} - Last name
   * @param emailAddress {string} - Email address
   * @param phoneNumber {string} - Phone number
   */
  public createUser(firstName='', lastName='', emailAddress='', phoneNumber='') {
    return new User(firstName, lastName, emailAddress, phoneNumber);
  }

  /**
   * Process the payment
   * @param payment
   */
  public async processPayment(payment: Payment) {
      const requestData = payment.prepareDataForRequest();
      const result = await this.api.createAndProcessPayment(requestData);
      if (!result.created) {
        throw { name: 'SDK Error', message: 'Something went wrong' };
      }
      return result.result.link;
  }
}
