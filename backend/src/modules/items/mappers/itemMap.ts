import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { IItem } from "../../../shared/infra/database/models/Item";
import { Item } from "../domain/item";
import { ItemName } from "../domain/itemprops/itemName";
import { ItemCost } from "../domain/itemprops/itemCost";
import { ItemDescription } from "../domain/itemprops/itemDescription";
import { ItemPicture } from "../domain/itemprops/itemPicture";
import { ItemPrices } from "../domain/itemprops/itemPrices";
import { ItemSpecialDay } from "../domain/itemprops/itemSpecialDay";
export class ItemMap {
    public static toPersistent(props : Item) : Either<CommonUseCaseResult.UnexpectedError, IItem> {
        try {
            const domain : IItem = {
                name : props.props.name.value,
                image : props.props.picture.value,
                prices : props.props.prices.value,
                isPrimary : props.props.isPrimary,
                _id : props.id.toValue(),
                specialDay : props.props.specialDay.value,
                description : props.props.description.value
            }

            return right(domain)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    public toDomain(item : IItem) : Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, Item> {
        const nameOrError =  ItemName.create({value : item.name})
        const descriptionOrError =  ItemDescription.create({value : item.description})
        const imageOrError =  ItemPicture.create({value : item.image})
        const pricesOrError =  ItemPrices.create(item.prices)
        const specialDayOrError =  ItemSpecialDay.create({value : item.specialDay as number})

        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }
      
        if (descriptionOrError.isLeft()) {
            return left(descriptionOrError.value)
        }
        if (imageOrError.isLeft()) {
            return left(imageOrError.value)
        }
        if (pricesOrError.isLeft()) {
            return left(pricesOrError.value)
        }
        if (specialDayOrError.isLeft()) {
            return left(specialDayOrError.value)
        }

        const itemOrError = Item.create({
            name : nameOrError.value,
            description : descriptionOrError.value,
            picture : imageOrError.value,
            prices : pricesOrError.value,
            specialDay : specialDayOrError.value,
            isPrimary : item.isPrimary
        })

        if (itemOrError.isLeft()) { 
            return left(itemOrError.value)
        }

        return right(itemOrError.value)
    }
}