

import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";
import {INumberProp} from "../../../user/domain/userProps/userGrade"


type ItemDayResponse =Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemSpecialDay>

export class ItemSpecialDay extends ValueObject<INumberProp>{

    get value() : number {
        return this.props.value
    }

    public static create( props : INumberProp) : ItemDayResponse {

        

        if (typeof props.value === "number" || props.value === null) {
            return right(new ItemSpecialDay(props))
        }
        return left(CommonUseCaseResult.InvalidValue.create({
            errorMessage: `Day specified is not valid.`,
            variable: "ITEM_DAY",
            location: `${ItemSpecialDay.name}.${ItemSpecialDay.create.name}`
        }))
        

    }
}