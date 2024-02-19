import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { findOrderByIdUseCase } from "../../orders/useCases/findOrderUseCase/index";
import { PaymentPayed } from "../domain/events/PaymentPayed";
import { orderRepo } from "../../orders/useCases/createOrderUseCase";
import { OrderMap } from "../../orders/mapper/orderMap";
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
    const order = await findOrderByIdUseCase.execute(event.payment.order_id.toValue())
    if (order.isLeft()) {
      console.log("ERRO AO EFETUAR O PAGAMENTO DO PEDIDO")
      return
    }
    const orderWithDate = OrderMap.stringToDate(order.value)

    if (orderWithDate.isLeft()) {
      return
    }

    orderWithDate.value.paid = true

    await orderRepo.save({dto : orderWithDate.value})

    console.log("[AfterPaymentPayed]: PAGAMENT EFETUADO COM SUCESSO")
  }
}
