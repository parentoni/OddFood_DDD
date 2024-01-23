import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { Payment } from "../domain/payment";

export type CreateInvoiceProps = {
  payment: Payment,
}

//Pass params to implementation specific use cases
export type CallbackInterpreterProps<T> = {
  payment: Payment,
  paymentDTO: T
}

export abstract class IPaymentService {

  /**
   * @method createInvoice
   * @description Creates invoice object on remote payment gateway (API PIX BB, Stripe, ect...), responsible only for dispatching the Payment to a remote payment gateway, thus, not returning.
   * @param props.payment - Payment Aggregate Root
   * */
  
  public abstract createInvoice (props: CreateInvoiceProps): Promise<Either<CommonUseCaseResult.InvalidValue, {message: string}>>

  
  /**
   * @method callbackInterpreter
   * @description Interprete webhook callback, and if it is valid, update payment aggregate to "payed"
   * @param props.payment - Payment aggregate root
   * @param props.paymentDTO - Inplementation specific DTO props.
   * */

  public abstract callbackInterpreter(props: CallbackInterpreterProps<any>): Promise<Either<CommonUseCaseResult.InvalidValue, null >>
}
