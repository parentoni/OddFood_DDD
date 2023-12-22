import { Guard } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { PaymentExternalId } from "./paymentExternalId";

export interface IPaymentProps {
  user: UniqueGlobalId,
  amount: number,
  payed: boolean,
  externalId: PaymentExternalId
}

export class Payment extends AggregateRoot<IPaymentProps> {
  get user(): UniqueGlobalId {
    return this.props.user
  }

  get amount(): number {
    return this.props.amount
  }

  get payed(): boolean {
    return this.props.payed
  }
  
  get externalId(): PaymentExternalId {
    return this.props.externalId
  }


  public static create (props: IPaymentProps, id?: UniqueGlobalId): Either<CommonUseCaseResult.InvalidValue, Payment> {

    const guardResult = Guard.againstNullOrUndefinedBulk([
      {argument: props.user, argumentName: "USER"},
      {argument: props.amount, argumentName: "AMOUNT"},
      {argument: props.payed, argumentName: "PAYED"},
      {argument: props.externalId, argumentName: "EXTERNAL_ID"}
    ])

    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    return right(
      new Payment({...props}, id)
      )
  }
  
}