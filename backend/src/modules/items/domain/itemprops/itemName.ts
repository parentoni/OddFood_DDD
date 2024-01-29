
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";

type ItemNameResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemName>

export class ItemName extends ValueObject<IDefaultProp>{

    get value() : string {
        return this.props.value
    }

    public static  create( props : IDefaultProp) : ItemNameResponse {

        const GuardResponse = Guard.againstNullOrUndefined(props.value.trim(), "ITEM_NAME")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ITEM_NAME",
                location: `${ItemName.name}.${ItemName.create.name}`
            }))
        }
    
        return right(new ItemName(props))


    }
}