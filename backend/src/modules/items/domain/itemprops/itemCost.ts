import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";
import {INumberProp} from "../../../user/domain/userProps/userGrade"
type ItemCostResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemCost>>


export class ItemCost extends ValueObject<INumberProp>{

    get value() : number {
        return this.props.value
    }

    public static async create( props : INumberProp) : ItemCostResponse {

        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ITEM_COST")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ITEM_COST",
                location: `${ItemCost.name}.${ItemCost.create.name}`
            }))
        }
       
        return right(new ItemCost(props))

    }
}