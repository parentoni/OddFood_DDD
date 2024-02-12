import { Cart } from "../../modules/cart/domain/cart"
import { Items } from "../../modules/food/domain/items"
import { GiClick } from "react-icons/gi";
import { TbHandClick } from "react-icons/tb";
import { format } from "date-fns";

import { RecentOrder } from "../../utils/functions/createOrder"
import { useContext } from "react";
import { CartContext } from "../../modules/cart/context/cartContext";
import { useNavigate } from "react-router-dom";
export const RecentOrderBox = (props : {order : RecentOrder}) => {
    const orderCart = new Cart(new Items(props.order.items))
    const itemsWithAmount = orderCart.getItemsWithAmount()
    const navigate = useNavigate()

    const {cart} = useContext(CartContext)
    return (
        <div onClick={() => (cart?.addToCart(props.order.items), navigate('/cart'))} className=" w-[70%] min-w-[70%] overflow-hidden justify-between h-[100px] min-h-[100px] flex flex-col bg-gray-100 rounded-lg px-2 py-2 ">
               <div className=' h-[65%] overflow-hidden'>
                    {itemsWithAmount.items.map((item, index) => {
                        return (
                        
                                <p className="text-xs font-semibold text-gray-600">{itemsWithAmount.amounts[index]}x {item.props.name} - {item.props.prices[0].name}</p>
                                
                        
                        )
                    })}
                </div>
                {/* <p className='text-xs font-semibold text-gray-800' >Total: R${orderCart.getPrice().toFixed(2).replace('.', ',')}</p> */}
                            <p className='text-xs font-semibold text-gray-800' >Data: {format(new Date(props.order.date), "dd/MM/yyyy")}</p>

                            <div className='flex items-center  flex-row'>
                                {/* <GiClick size={24}/> */}
                                <TbHandClick size={18} />
                                <p className="text-xs"> Clique para adicionar ao carrinho</p>
                               
                            </div>

        </div>

    )
}