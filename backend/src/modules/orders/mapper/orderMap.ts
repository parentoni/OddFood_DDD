import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { IItem } from "../../../shared/infra/database/models/Item";
import { IOrder } from "../../../shared/infra/database/models/Order";
import { Order } from "../domain/order";
import { OrderDate } from "../domain/orderProps/orderDate";
import { OrderItems } from "../domain/orderProps/orderItems";
import { OrderPayment } from "../domain/orderProps/orderPayment";
import { OrderUsername } from "../domain/orderProps/orderUsername";
import { IOrderWithDateObject } from "../../../shared/infra/database/models/Order";
import { IOrderWithDate } from "../../../shared/infra/database/models/Order";
import mongoose from "mongoose";
export class OrderMap {
    public static toPersistent(props : Order) : Either<CommonUseCaseResult.UnexpectedError, IOrderWithDate> {
        try {
            const domain : IOrderWithDate = {
                username : props.props.username.value,
                date : new Date(props.props.date.value),
                items : props.props.items.value,
                paid : props.props.paid,
                _id : props.id.toValue(),
                // description : props.props.description.value
            }

            return right(domain)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
    
    public static stringToDate(props : IOrder) : Either<CommonUseCaseResult.UnexpectedError, IOrderWithDate> {
        try {
            const domain : IOrderWithDate = {
                username : props.username,
                date : new Date(props.date),
                items : props.items.value,
                paid : props.paid,
                _id : props._id,
                // description : props.props.description.value
            }

            return right(domain)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
    // public toDomain(item : IItem) : Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, Item> {
    //     const nameOrError =  ItemName.create({value : item.name})
    //     const descriptionOrError =  ItemDescription.create({value : item.description})
    //     const imageOrError =  ItemPicture.create({value : item.image})
    //     const pricesOrError =  ItemPrices.create(item.prices)
    //     const specialDayOrError =  ItemSpecialDay.create({value : item.specialDay as number})

    //     if (nameOrError.isLeft()) {
    //         return left(nameOrError.value)
    //     }
      
    //     if (descriptionOrError.isLeft()) {
    //         return left(descriptionOrError.value)
    //     }
    //     if (imageOrError.isLeft()) {
    //         return left(imageOrError.value)
    //     }
    //     if (pricesOrError.isLeft()) {
    //         return left(pricesOrError.value)
    //     }
    //     if (specialDayOrError.isLeft()) {
    //         return left(specialDayOrError.value)
    //     }

    //     const itemOrError = Item.create({
    //         name : nameOrError.value,
    //         description : descriptionOrError.value,
    //         picture : imageOrError.value,
    //         prices : pricesOrError.value,
    //         specialDay : specialDayOrError.value,
    //         isPrimary : item.isPrimary
    //     })

    //     if (itemOrError.isLeft()) { 
    //         return left(itemOrError.value)
    //     }

    //     return right(itemOrError.value)
    // }
}