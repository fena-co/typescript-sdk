import {User} from "../user";

export class Payment {
  protected referenceNumber: string; // A unique payment reference number
  protected amount: string; // Amount in format '10.10'
  protected dueDate: string; // Date in ISO string format
  protected user?: User;

  constructor(referenceNumber: string, amount: string, dueDate?: string, user?: User) {
    this.referenceNumber = referenceNumber;
    this.amount = amount;
    this.dueDate = dueDate;
    if (user) this.user = user;
  }

  public setUser(user: User) {
    this.user = user;
  }

  public updateAmount(amount: string) {
    this.amount = amount;
  }

  public updateDueDate(dueDate: string) {
    this.dueDate = dueDate;
  }

  public updateReferenceNumber(referenceNumber: string) {
    this.referenceNumber = referenceNumber;
  }

  public prepareDataForRequest () {
    return  {
      invoiceRefNumber: this.referenceNumber,
      amount: this.amount,
      dueDate: this.dueDate,
      customerEmail: this.user?.getEmailAddress(),
      customerName: this.user?.getFullName(),
      type: 'qr'
    }
  }
}
