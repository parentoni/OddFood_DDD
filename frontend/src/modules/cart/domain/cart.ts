import { Items } from "../../food/domain/items"
import { Item } from "../../food/domain/item"
import { key } from "../context/cartContext"
import { Console } from "console"
export class Cart {
    cart : Items

    constructor(items : Items) {
        this.cart = items
    }

    public static create(props : Items) {
        return new Cart(props)
    }

    public getSize() {

        return(this.cart.items.length)

    }

    public addToCart(items : Item[]) {
        const newCart = this.cart.items

        for (const item of items) {
            newCart.push(item)
        }

        this.cart = Items.create(newCart)

        localStorage.setItem(key, JSON.stringify(this.cart))

        return this.cart
    }

    public removeFromCart(item : Item) {
        const reverseArray = this.cart.items.reverse()
        
        const index = reverseArray.findIndex(el => el.props._id === item.props._id && el.props.observations === item.props.observations && el.props.prices[0].name === item.props.prices[0].name)
        reverseArray.splice(index, 1)

        this.cart = Items.create(reverseArray.reverse())

        localStorage.setItem(key, JSON.stringify(this.cart))

        return this.cart
    }

    public getItemsWithAmount() {
        let counter = -1
        const cartWithAmount : Item[] = []
        const amounts : number[] = []
        for (const item of this.cart.items) {
            const found = cartWithAmount.some(el => el.props._id === item.props._id && el.props.observations === item.props.observations && el.props.prices[0].name === item.props.prices[0].name)
            
            if (!found) {
                
                cartWithAmount.push(item)

                counter += 1
                amounts[counter] = 1
            }else {
                const index = cartWithAmount.findIndex(el => el.props._id === item.props._id && el.props.observations === item.props.observations && el.props.prices[0].name === item.props.prices[0].name)
                amounts[index] += 1
            }
            

        }
        return {items : cartWithAmount, amounts : amounts}
    }

    public getPrice() {
        let price = 0

        for (const item of this.cart.items) {
            price += item.props.prices[0].price
        }

        return price
    }

    public toPersistent() {
        const items = []

        for (const item of this.cart.items) {
            items.push({
                _id : item.props._id,
                name : item.props.name,
                cost : item.props.prices[0].cost,
                observations : item.props.observations,
                price : item.props.prices[0].price,
                size : item.props.prices[0].name
            })
        }
        return items
    }
}