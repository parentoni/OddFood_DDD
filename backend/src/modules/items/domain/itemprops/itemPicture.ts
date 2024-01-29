
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../../shared/core/Guard";

type ItemPictureResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, ItemPicture>

export class ItemPicture extends ValueObject<IDefaultProp>{

    get value() : string {
        return this.props.value
    }

    public static  create( props : IDefaultProp) : ItemPictureResponse {

        const GuardResponse = Guard.againstNullOrUndefined(props.value.trim(), "ITEM_PICTURE")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "ITEM_PICTURE",
                location: `${ItemPicture.name}.${ItemPicture.create.name}`
            }))
        }
    
        return right(new ItemPicture(props))


    }
}