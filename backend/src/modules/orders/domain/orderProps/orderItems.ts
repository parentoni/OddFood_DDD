import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { IDefaultProp } from "../../../user/domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { IItemWithObservations } from "../../../../shared/infra/database/models/Item";
import { ItemRepo } from "../../../items/repository/itemRepo";
import { IOrderItem } from "../../../../shared/infra/database/models/Order";
interface IItemsProps {
    value : IOrderItem[]
}

export class OrderItems extends ValueObject<IItemsProps> {
    
    

    get value() : IOrderItem[] {
        return this.props.value

    }

    public static async create(props : IItemsProps) : Promise<PropsResponse<OrderItems>> {
        const repo = new ItemRepo()
        for (const item of props.value) {
            const itemValue = await repo.find_many({dto : {_id : item._id}})

            if (itemValue.isLeft()) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `Could not find item with the specified ID`,
                    variable: "ORDER_ITEMS",
                    location: `${OrderItems.name}.${OrderItems.create.name}`}))
            }

            const index = itemValue.value[0].prices.findIndex(el => el.price === item.price)

            

            if (index === -1 || itemValue.value[0].name !== item.name || itemValue.value[0].prices[index].cost !== item.cost || itemValue.value[0].prices[index].name !== item.size) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `One of the item values does not match the database`,
                    variable: "ORDER_ITEMS",
                    location: `${OrderItems.name}.${OrderItems.create.name}`}))
            }

            const GuardResponse = Guard.againstNullOrUndefinedBulk([
                {argument : item.name, argumentName : "ITEM_NAME"},
                {argument : item._id, argumentName : "ITEM_ID"},
                {argument : item.price, argumentName : "ITEM_PRICE"},
            ]) 
            if (GuardResponse.isLeft()) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `${GuardResponse.value.error.errorMessage}`,
                    variable: "ORDER_ITEMS",
                    location: `${OrderItems.name}.${OrderItems.create.name}`
                }))
            }
        }

        return right(new OrderItems(props))

         
        
        
    }
}