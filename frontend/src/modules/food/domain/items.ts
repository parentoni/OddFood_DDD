import { Either, left, right } from "../../../utils/shared/Result";
import { Item } from "./item";
import {IItem, Price} from "../../../utils/services/dtos/item"
import { IItemWithObservations } from "../../../utils/services/dtos/item";
export class Items {
    items : Item[] 
    constructor (props : Item[]) {
        this.items = props
    }    

    public static create(props : Item[]) {
        return new Items(props)
    }

    public static createFromPersistent(props : IItem[] | IItemWithObservations[]) {
        const items :Item[] = []

        for (const item of props) {
            items.push(Item.create(item))
        }

        return Items.create(items)
    }

    public getDailyItem() : Either<null, Item> {
        let day = (new Date()).getDay() + 1
        
        for (const item of this.items) {
            if (item.props.specialDay === day) {
                return right(item)
            }
        }

        return left(null)
    }

    public getPrimary() :  Item[]  {

        const primaryItems = []

        for (const item of this.items) {
            if (item.props.isPrimary === true && item.props.specialDay === 0) {
                primaryItems.push(item)
            }
        }
        return primaryItems
    }

    public getSecondary() : Item[] {
        const secondaryItems = []

        for (const item of this.items) {
            if (item.props.isPrimary === false) {
                secondaryItems.push(item)
            }
        }
        return secondaryItems
    }

    public getItemById(id : string) : Either<null, Item>{
        
        for (const item of this.items) {
            if (item.props._id === id) {
                return right(item)
            }
        }
        return left(null)
    }
}