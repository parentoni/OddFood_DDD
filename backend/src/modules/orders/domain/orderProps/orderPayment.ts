import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";


export class OrderPayment extends ValueObject<IDefaultProp> {

    get value() : string {
        return this.props.value
    }

    public static create(props : IDefaultProp) : PropsResponse<OrderPayment> {
        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ORDER_PAYMENT")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ORDER_PAYMENT",
                location: `${OrderPayment.name}.${OrderPayment.create.name}`
            }))
        }

        return right(new OrderPayment(props))
    }
}