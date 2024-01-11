import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { Payment } from "../domain/payment";

export abstract class PaymentService {

  /**
   * @method createInvoice
   * @description Creates invoice object on remote payment gateway (API PIX BB, Stripe, ect...)
   * */
  
  public abstract createInvoice (): Either<CommonUseCaseResult.InvalidValue, Payment>
}
