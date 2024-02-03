import { createContext, useEffect, useState } from "react"
import { Item } from "../../food/domain/item"
import { Items } from "../../food/domain/items"
import React from "react"
import { Cart } from "../domain/cart"
import { UserStorageDTO } from "../../../utils/services/dtos/userStorage"

export let key = "ODDFOOD_KEY"

export type CartContextTypes = {
    cart : Cart | null,
}

const CartContextDefault = {cart : Cart.create(Items.create([]))}

export const CartContext = React.createContext<CartContextTypes>(CartContextDefault)

export function CartContextProvider({children} : React.PropsWithChildren<{}>)  {
    const [cart, setCart] = useState<Cart>(CartContextDefault.cart)

    useEffect(() => {


        const items = localStorage.getItem(key)
        
        
        if (items) {
            const itemsParse = JSON.parse(items)
            setCart(Cart.create(itemsParse))
        }

    }, [])



    return (
        <CartContext.Provider value={{cart}}>
            {children}
        </CartContext.Provider>
    )

}