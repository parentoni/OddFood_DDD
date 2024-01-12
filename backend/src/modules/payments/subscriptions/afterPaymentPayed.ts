import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { PaymentPayed } from "../domain/events/PaymentPayed";

/**
 * @description After payment payed subscription, will run every time payment is payed
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class AfterPaymentPayed implements IHandle<PaymentPayed> {

  constructor() {
    console.log("set up")
    this.setupSubscriptions()
  }

  //Registra esse evento no domain events register. Interno
  setupSubscriptions(): void {
      DomainEvents.register(this.onPaymentPayed.bind(this), PaymentPayed.name)
  }

  // Funcao que contem logica apos paymetn payed
  private async onPaymentPayed(event: PaymentPayed): Promise<void> {
    console.log("[AfterPaymentPayed]: EDITE-ME")
  }
}
