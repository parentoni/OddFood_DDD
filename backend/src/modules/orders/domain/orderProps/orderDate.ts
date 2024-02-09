import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import mongoose, { Date } from "mongoose";

interface IDateProp {
    value : string
}

export class OrderDate extends ValueObject<IDateProp> {

    get value() : string {
        return this.props.value
    }

    public static create(props : IDateProp) : PropsResponse<OrderDate> {
        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ORDER_DATE")
        
        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ORDER_DATE",
                location: `${OrderDate.name}.${OrderDate.create.name}`
            }))
        }

        return right(new OrderDate(props))
    }
}