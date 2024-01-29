

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

    public static  create( props : INumberProp) : ItemDayResponse {

        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ITEM_PICTURE")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ITEM_PICTURE",
                location: `${ItemSpecialDay.name}.${ItemSpecialDay.create.name}`
            }))
        }
    
        return right(new ItemSpecialDay(props))


    }
}