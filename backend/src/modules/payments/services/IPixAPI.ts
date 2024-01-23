import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError"
import { Either } from "../../../shared/core/Result"
import { PaymentExternalId } from "../domain/paymentExternalId"
import { PixCob, PixDTO } from "../dtos/PixDTO"
import { CreateInvoiceProps } from "./IPaymentServices"

export type PixApiCreateChargeDTO = {txid: PaymentExternalId, amount: number}
export type PixApiCreateChargeResponse = Promise<Either<CommonUseCaseResult.InvalidValue, PixDTO>>

export abstract class IPixApi {
  /**
   * @method createCob
   * @description Creates PIX cobranca.
   * */
  public abstract createCob (props: CreateInvoiceProps): Promise<Either<CommonUseCaseResult.InvalidValue, PixCob>>
}
