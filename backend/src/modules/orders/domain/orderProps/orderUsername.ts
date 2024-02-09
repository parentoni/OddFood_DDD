import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";


export class OrderUsername extends ValueObject<IDefaultProp> {

    get value() : string {
        return this.props.value
    }

    public static create(props : IDefaultProp) : PropsResponse<OrderUsername> {
        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ORDER_USERNAME")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ORDER_USERNAME",
                location: `${OrderUsername.name}.${OrderUsername.create.name}`
            }))
        }

        return right(new OrderUsername(props))
    }
}