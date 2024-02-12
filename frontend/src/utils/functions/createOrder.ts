import { useContext } from "react";
import { CartContext, key } from "../../modules/cart/context/cartContext";
import { NAME_KEY } from "../../pages/Cart/cartFooter";
import { Api } from "../services/Api";
import { IOrder } from "../services/dtos/order";
import { Either, left, right } from "../shared/Result";
import { Cart } from "../../modules/cart/domain/cart";
import { Items } from "../../modules/food/domain/items";
import { Item } from "../../modules/food/domain/item";
export let RECENT_ORDERS_KEY = "ODDFOOD_RECENT_ORDERS"

export interface RecentOrder {
    items : Item[],
    date : Date
}

export async function createOrder(cart : Cart, name : string, setLoading : (x : boolean) => void) : Promise<Either<Response | null, {message : string}>> {
    setLoading(true)
    // console.log(cart.cart.items)
    console.log('heyddd')
    const date = new Date()

    if (!cart?.cart.items) {
        return left(null)
    }

    const items = cart.toPersistent()

    console.log(items)

    const response = await Api.createOrder({items : items, date : date, paid : false, username: name})

    if (response.isLeft()) {
        return left(response.value)
    }

    const recentOrders : RecentOrder[] = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(RECENT_ORDERS_KEY))))
    
    localStorage.setItem(NAME_KEY, name.trim())

    if (recentOrders) {
        if (recentOrders.length >= 5) {
            recentOrders.splice(0, 1)
        }

        recentOrders.push({
            items : cart.cart.items,
            date : date
        })
    
        localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(recentOrders))
    }else {
        localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify([{items : cart.cart.items,
            date : date}]))

    }

    cart.clearCart()
    cart.cart = Items.create([])
    localStorage.setItem(key, JSON.stringify(cart.cart))

    return right(response.value)


}