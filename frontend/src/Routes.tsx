import { Route, Router, createBrowserRouter, BrowserRouter, Routes } from "react-router-dom";
import { ItemPage } from "./pages/Item/ItemPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { useParams } from "react-router-dom";
import { CartPage } from "./pages/Cart/CartPage";

// export function getItemId( ){
//     let {itemId} = useParams()

//     if (!itemId) {
//         alert("Um erro inesperado aconteceu ao encontrar os flashcards [Erro 2]")
//     }else {
//         return(itemId)
//     }
// }

const router = createBrowserRouter([
    {path : "/",
    element : <MainPage/>},
    {path : "/item/:itemId", 
    element : <ItemPage/>},
    {path : "/cart",
element : <CartPage/>}
])

export default router