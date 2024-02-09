import { Items } from "../../../modules/food/domain/items"
import { Cart } from "../../../modules/cart/domain/cart"

export interface UserStorageDTO {
    name : string,
    cart : Cart,
    lastOrders : Items
}