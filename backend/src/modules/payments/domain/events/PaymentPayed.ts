import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Payment } from "../payment";

/**
 * @description Payment event triggered on payment pay. See {} for event handler
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class PaymentPayed implements IDomainEvent {
  
    dateTimeOccurred: Date;
    payment: Payment

    /**
     * @description Creates new payment payed event
     * @props dateTimeOccurred - Time of the event
     * @props payment - The payment that has been payed
     * */

    constructor (dateTimeOccurred: Date, payment: Payment) {
      this.payment = payment
      this.dateTimeOccurred = dateTimeOccurred
    }


    getAggregateId(): UniqueGlobalId {
      return this.payment.id
    }

}
