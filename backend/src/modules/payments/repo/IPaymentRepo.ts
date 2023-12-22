import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either } from "../../../shared/core/Result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { Payment } from "../domain/payment";

export interface IPaymentRepo {
  save(payment: Payment): Promise<Either<CommonUseCaseResult.UnexpectedError, null>>,
  findOneByExternalId(externalId:string): Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Payment>>
}