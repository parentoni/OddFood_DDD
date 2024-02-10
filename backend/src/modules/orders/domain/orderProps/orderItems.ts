import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { PropsResponse } from "../../../../shared/utils/PropsType";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { ItemRepo } from "../../../items/repository/itemRepo";
import { IOrderItem } from "../../../../shared/infra/database/models/Order";
import { IItem, Price } from "../../../../shared/infra/database/models/Item";
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

      //First item can not be found. Ex: Empty arra, perform check
      const firstItemValue: IItem | undefined = itemValue.value[0] 

      if (firstItemValue === undefined) {
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: `Could not find item with the specified ID`,
          variable: "ORDER_ITEMS",
          location: `${OrderItems.name}.${OrderItems.create.name}`}))

      }

      const index = firstItemValue.prices.findIndex(el => el.price === item.price)

      //Selected Price can be undefined, in case of a wrong index, or a empty array. Check it
      const selectedPrice: Price | undefined = firstItemValue.prices[index]
      if (!selectedPrice){
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: `One of the item values does not match the database`,
          variable: "ORDER_ITEMS",
          location: `${OrderItems.name}.${OrderItems.create.name}`}))
      }

      if (index === -1 || firstItemValue.name !== item.name || selectedPrice.cost !== item.cost ||selectedPrice.name !== item.size) {

        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: `One of the item values does not match the database`,
          variable: "ORDER_ITEMS",
          location: `${OrderItems.name}.${OrderItems.create.name}`}))
      }

      const GuardResponse = Guard.againstNullOrUndefinedBulk([
        {argument : item.name, argumentName : "ITEM_NAME"},
        {argument : item.observations, argumentName : "ITEM_OBSERVATIONS"},
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
