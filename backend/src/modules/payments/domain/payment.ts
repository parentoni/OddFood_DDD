import { Guard } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { PaymentExternalId } from "./paymentExternalId";
import { SUPPORTED_PAYMENT_SERVICES } from "../services/implementations/payment_services";

export interface IPaymentProps {
  user: UniqueGlobalId,
  amount: number,
  payed: boolean,
  externalId: PaymentExternalId,
  service: SUPPORTED_PAYMENT_SERVICES
}
/**
 * @description Payment AggregateRoot, DB abstration of different payments methods (PIX, Card, etc). All diferent payment methods should be abstracted to this Agreggate.
 * @auhtor Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */

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
  
  // External identifier to payment
  get externalId(): PaymentExternalId {
    return this.props.externalId
  }

  get service(): SUPPORTED_PAYMENT_SERVICES {
    return this.props.service
  }


  public static create (props: IPaymentProps, id?: UniqueGlobalId): Either<CommonUseCaseResult.InvalidValue, Payment> {
    
    //Guard against undefined values
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {argument: props.user, argumentName: "USER"},
      {argument: props.amount, argumentName: "AMOUNT"},
      {argument: props.payed, argumentName: "PAYED"},
      {argument: props.externalId, argumentName: "EXTERNAL_ID"}
    ])

    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }
    
    //If all values are valid, create Payment
    return right(
      new Payment({...props}, id)
      )
  }
  
}
