import { IOrderItem } from "../services/dtos/order"


export function getItemsAndAmounts(items : IOrderItem[]) {
    let counter = -1
        const cartWithAmount : IOrderItem[] = []
        const amounts : number[] = []
        for (const item of items) {
            const found = cartWithAmount.some(el => el._id === item._id && el.observations === item.observations && el.size === item.size)
            
            if (!found) {
                
                cartWithAmount.push(item)

                counter += 1
                amounts[counter] = 1
            }else {
                const index = cartWithAmount.findIndex(el => el._id === item._id && el.observations === item.observations && el.size === item.size)
                amounts[index] += 1
            }
            

        }
        return {items : cartWithAmount, amounts : amounts}
}