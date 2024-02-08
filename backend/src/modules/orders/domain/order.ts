import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { IOrderItem } from "../../../shared/infra/database/models/Order";
import { OrderDate } from "./orderProps/orderDate";
import { OrderItems } from "./orderProps/orderItems";
import { OrderPayment } from "./orderProps/orderPayment";
import { OrderUsername } from "./orderProps/orderUsername";
import { Guard } from "../../../shared/core/Guard";
import { Either, left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
export interface IOrderProps {
    username : OrderUsername,
    items : OrderItems,
    date : OrderDate,
    payment : OrderPayment,
    paid : boolean
}

type OrderResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Order>


export class Order extends AggregateRoot<IOrderProps> {

    get username() : string {
        return this.props.username.value
    }

    get date() : string {
        return this.props.date.toString()
    }

    get items() : IOrderItem[] {
        return this.props.items.value
    }

    get paid() : boolean {
        return this.props.paid
    }

    get payment() : string {
        return this.props.payment.value
    }

    public static create(props : IOrderProps) : OrderResponse  {
        const GuardResponse = Guard.againstNullOrUndefinedBulk([
            {argument : props.username, argumentName : "USER_NAME"},
            {argument : props.payment, argumentName : "USER_ROLE"},
            {argument : props.date, argumentName : "USER_EMAIL"},
            // {argument : props.grade.value, argumentName : "USER_GRADE"}
        ])

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }

        return right(new Order(props))
    }
}