import {IItem, IItemWithObservations, Price} from "../../../utils/services/dtos/item"
import { Either } from "../../../utils/shared/Result"
export class Item {

    props : IItem | IItemWithObservations

    constructor(props : IItem | IItemWithObservations) {
        this.props = props
    }

    public static create(props : IItem | IItemWithObservations) {
        return new Item(props)
    }

    public getCheapestPrice() : number{
        let cheapestPrice = Infinity

        for (const price of this.props.prices) {
            if (price.price < cheapestPrice) {
                cheapestPrice = price.price
            }
        }
        return cheapestPrice
    }
}
