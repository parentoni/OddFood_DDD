import React, { createContext, useContext, useEffect, useState } from "react"
import { Items } from "../domain/items"

export type FoodContextTypes = {
    items : Items | null,
    // setItems : (x : null | Items) => void
}
const FoodContextDefault = {items : Items.create([])}

const FoodContext = React.createContext<FoodContextTypes>(FoodContextDefault)

// get context items
// const {items} = useContext(FoodContext)

export function FoodContextProvider({children} : React.PropsWithChildren<{}>) {
    const [items, setItems] = useState<null | Items>(null)

    useEffect(() => {
        //request get items
        // getItems()
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