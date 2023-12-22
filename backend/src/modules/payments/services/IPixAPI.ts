import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError"
import { Either } from "../../../shared/core/Result"
import { PaymentExternalId } from "../domain/paymentExternalId"
import { PixDTO } from "../dtos/PixDTO"

export type PixApiCreateChargeDTO = {txid: PaymentExternalId, amount: number}
export type PixApiCreateChargeResponse = Promise<Either<CommonUseCaseResult.InvalidValue, PixDTO>>

export interface IPixApi {
  createCharge (props: PixApiCreateChargeDTO): PixApiCreateChargeResponse
}