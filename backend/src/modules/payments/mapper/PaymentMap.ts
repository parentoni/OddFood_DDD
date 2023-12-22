import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { PersistentPayment } from "../../../shared/infra/database/models/Payment";
import { EitherUtils } from "../../../shared/utils/EitherUtils";
import { Payment } from "../domain/payment";
import { PaymentExternalId } from "../domain/paymentExternalId";

export class PaymentMap {
  public static toDomain(persistent: PersistentPayment): Either<CommonUseCaseResult.InvalidValue, Payment> {

    const userIdOrError = UniqueGlobalId.createExisting(persistent.user)
    const externalIdOrError = PaymentExternalId.create({txid: persistent.external_id})

    const combineResult = EitherUtils.combine([userIdOrError, externalIdOrError])

    if (combineResult.isLeft()) {
      return left(combineResult.value)
    }


    
    const domain = Payment.create({
      user: userIdOrError.getRight(),
      externalId: externalIdOrError.getRight(),
      amount: persistent.amount,
      payed: persistent.payed
    }, new UniqueGlobalId(persistent._id.toString()))
  
    if (domain.isLeft()) {
      return left(domain.value)
    }

    return right(domain.value)
  }

  public static toPersistent(domain: Payment): PersistentPayment {
    return {
      _id: domain.id.toValue(),
      user: domain.user.toValue(),
      amount: domain.amount,
      payed: domain.payed,
      external_id: domain.externalId.value
    }
  }

}