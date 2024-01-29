import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { ItemDescription } from "./itemprops/itemDescription";
import { ItemPicture } from "./itemprops/itemPicture";
import { ItemPrices } from "./itemprops/itemPrices";
import { ItemName } from "./itemprops/itemName";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { Either, left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../shared/core/Guard";
import { ItemCost } from "./itemprops/itemCost";
import { Entity } from "../../../shared/domain/Entity";
import { ItemSpecialDay } from "./itemprops/itemSpecialDay";

type ItemResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Item>

export interface IItemProps {
    name : ItemName,
    prices : ItemPrices,
    picture : ItemPicture,
    description : ItemDescription,
    cost : ItemCost,
    isPrimary : Boolean,
    specialDay : ItemSpecialDay
}

export class Item extends AggregateRoot<IItemProps> {
    
    get userId() : Boolean {
        return this.props.isPrimary
    }

    get specialDay() : ItemSpecialDay {
        return this.specialDay
    }

    get name() : ItemName {
        return this.name
    }
    get prices() : ItemPrices {
        return this.prices
    }

    get grade() : ItemPicture {
        return this.grade
    }

    get email() : ItemDescription {
        return this.email
    }
    get password() : ItemCost {
        return this.password
    }

    public static create(props : IItemProps, id? : UniqueGlobalId) : ItemResponse {
        const GuardResponse = Guard.againstNullOrUndefinedBulk([
            {argument : props.name.value, argumentName : "USER_NAME"},
            {argument : props.description.value, argumentName : "USER_EMAIL"},
            {argument : props.cost.value, argumentName : "USER_PASSWORD"},
            {argument : props.picture.value, argumentName : "USER_GRADE"}
        ])

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }

        return right(new Item(props, id))
    }

}