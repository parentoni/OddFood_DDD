import { UseCase } from "../../../../shared/core/UseCase";
import { IItemNoId } from "../../../../shared/infra/database/models/Item";
import { CreateItemResponse } from "./createItemResponse";
import { Price } from "../../../../shared/infra/database/models/Item";
import { IItemRepo } from "../../repository/IItemRepo";
import { ItemRepo } from "../../repository/itemRepo";
import { Item } from "../../domain/item";
import { ItemName } from "../../domain/itemprops/itemName";
import { ItemCost } from "../../domain/itemprops/itemCost";
import { ItemDescription } from "../../domain/itemprops/itemDescription";
import { ItemPicture } from "../../domain/itemprops/itemPicture";
import { ItemPrices } from "../../domain/itemprops/itemPrices";
import { ItemSpecialDay } from "../../domain/itemprops/itemSpecialDay";
import {EitherUtils} from "../../../../shared/utils/EitherUtils"
import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { ItemMap } from "../../mappers/itemMap";

export class CreateItemUseCase implements UseCase<IItemNoId, CreateItemResponse > {
    private itemRepo : IItemRepo

    constructor(repo : IItemRepo) {
        this.itemRepo = repo
    }

    async execute(item : IItemNoId) : CreateItemResponse {
        const nameOrError =  ItemName.create({value : item.name})
        const costOrError =  ItemCost.create({value : item.cost as number})
        const descriptionOrError =  ItemDescription.create({value : item.description})
        const imageOrError =  ItemPicture.create({value : item.image})
        const pricesOrError =  ItemPrices.create(item.prices)
        const specialDayOrError =  ItemSpecialDay.create({value : item.specialDay as number})

        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }
        if (costOrError.isLeft()) {
            return left(costOrError.value)
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

        const ItemOrError = Item.create({
            name : nameOrError.value,
            cost : costOrError.value,
            description : descriptionOrError.value,
            picture : imageOrError.value,
            prices : pricesOrError.value,
            specialDay : specialDayOrError.value,
            isPrimary : item.isPrimary
        })

        if (ItemOrError.isLeft()) { 
            return left(ItemOrError.value)
        }

        try {
            const itemDomain = ItemMap.toPersistent(ItemOrError.value)

            if (itemDomain.isLeft()) {
                return left(itemDomain.value)
            }

            const item = await this.itemRepo.save({dto : itemDomain.value})

            if (item.isLeft()) {
                return left(item.value)
            }
            return right(item.value)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
}