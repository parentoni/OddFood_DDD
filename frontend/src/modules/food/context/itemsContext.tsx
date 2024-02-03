import React, { createContext, useContext, useEffect, useState } from "react"
import { Item } from "../domain/item"
import { Items } from "../domain/items"
import { Api } from "../../../utils/services/Api"
export type FoodContextTypes = {
    items : Items | null,
    // setItems : (x : null | Items) => void
}
const FoodContextDefault = {items : Items.create([])}

export const FoodContext = React.createContext<FoodContextTypes>(FoodContextDefault)

// get context items
// const {items} = useContext(FoodContext)

export function FoodContextProvider({children} : React.PropsWithChildren<{}>) {
    const [items, setItems] = useState<null | Items>(null)

    useEffect(() => {
        //request get items
        Api.getAllItems().then((res) => {
            if (res.isLeft()) {
                return
            }

            const DomainItems = []

            for (const item of res.value) {
                DomainItems.push(Item.create(item))
            }

            setItems(Items.create(DomainItems))
        })
    }, [])
    return (
        <FoodContext.Provider value={{items}}>
            {children}
        </FoodContext.Provider>
    )

}

// export const FoodContextProvider = (props : React.PropsWithChildren<{}>) => {

    
//     return(

//         <FoodContext.Provider>
//             {props.children}
//         </FoodContext.Provider>
//     )
// }