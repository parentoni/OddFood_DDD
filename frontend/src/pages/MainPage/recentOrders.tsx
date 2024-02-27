import { Cart } from "../../modules/cart/domain/cart"
import { Items } from "../../modules/food/domain/items"
import { GiClick } from "react-icons/gi";
import { TbHandClick } from "react-icons/tb";
import { format } from "date-fns";
import { Item } from "../../modules/food/domain/item";
import { RecentOrder } from "../../utils/functions/createOrder"
import { useContext } from "react";
import { CartContext } from "../../modules/cart/context/cartContext";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../../modules/food/context/itemsContext";
export const RecentOrderBox = (props : {order : RecentOrder}) => {

    const itemsArray : Item[] = []
    const {items} = useContext(FoodContext)

    for (const item of props.order.items) {
        if (item.props.specialDay !== 0 && item.props.specialDay !== (new Date()).getDay() + 1) {
            const dailyItem = items?.getDailyItem()
            if (dailyItem?.isRight()) {
                let index = dailyItem.value.props.prices.findIndex(el => el.name === item.props.prices[0].name)
                itemsArray.push(new Item({ 
                    _id : dailyItem.value.props._id,
                    name : dailyItem.value.props.name,
                    observations : dailyItem.value.props.observations? dailyItem.value.props.observations : "",
                    prices: [{name : dailyItem.value.props.prices[index].name, price : dailyItem.value.props.prices[index].price, cost : dailyItem.value.props.prices[index].cost}],
                    description : dailyItem.value.props.description,
                    image : dailyItem.value.props.image,
                    isPrimary : dailyItem.value.props.isPrimary,
                    specialDay : dailyItem.value.props.specialDay
                }))
            }
        }else {
            itemsArray.push(item)
        }
    }   
    
    const orderCart = new Cart(new Items(itemsArray))
    const itemsWithAmount = orderCart.getItemsWithAmount()
    const navigate = useNavigate()

    const {cart} = useContext(CartContext)
    return (
        <div onClick={() => (cart?.addToCart(itemsArray), navigate('/cart'))} className=" w-[70%] min-w-[70%] overflow-hidden justify-between h-[100px] min-h-[100px] flex flex-col bg-gray-100 rounded-lg px-2 py-2 ">
               <div className=' h-[65%] overflow-hidden'>
                    {itemsWithAmount.items.map((item, index) => {
                        return (
                        
                                <p className="text-xs font-semibold text-gray-600">{itemsWithAmount.amounts[index]}x {item.props.specialDay === (new Date()).getDay() + 1? "Prato do dia" : item.props.name} - {item.props.prices[0].name}{index > 1? "..." : ""}</p>
                                
                        
                        )
                    })}
                </div>
                {/* <p className='text-xs font-semibold text-gray-800' >Total: R${orderCart.getPrice().toFixed(2).replace('.', ',')}</p> */}
                            <p className='text-xs font-semibold text-gray-800'>Data: {format(new Date(props.order.date), "dd/MM/yyyy")}</p>

                            <div className='flex items-center  flex-row'>
                                {/* <GiClick size={24}/> */}
                                <TbHandClick size={18} />
                                <p className="text-xs"> Clique para adicionar ao carrinho</p>
                               
                            </div>

        </div>

    )
}