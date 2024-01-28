import { IItem, Item } from "./item";

export class Items {
    items : Item[]
    constructor (props : Item[]) {
        this.items = props
    }    

    public static create(props : Item[]) {
        return new Items(props)
    }

    public static createFromPersistent(props : IItem[]) {
        const items :Item[] = []

        for (const item of props) {
            items.push(Item.create(item))
        }

        return Items.create(items)
    }

    public getDailyItem() {
        let day = (new Date()).getDay()
        
        for (const item of this.items) {
            if (item.props.specialDay === day) {
                return item.props
            }
        }

        return null
    }

    public getPrimary() {
        
    }
}