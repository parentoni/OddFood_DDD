import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { INumberProp } from "../../../user/domain/userProps/userGrade";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";
type ItemDescriptionResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemDescription>>


export class ItemDescription extends ValueObject<IDefaultProp>{

    get value() : string {
        return this.props.value
    }

    public static async create( props : IDefaultProp) : ItemDescriptionResponse {

        const GuardResponse = Guard.againstNullOrUndefined(props.value, "ITEM_DESCRIPTION")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ITEM_DESCRIPTION",
                location: `${ItemDescription.name}.${ItemDescription.create.name}`
            }))
        }
       
        return right(new ItemDescription(props))

        



    }
}