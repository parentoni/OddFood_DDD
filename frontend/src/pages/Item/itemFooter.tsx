import { IItem, IItemWithObservations, Price } from "../../utils/services/dtos/item"
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useContext } from "react";
import { CartContext } from "../../modules/cart/context/cartContext";
import { Item } from "../../modules/food/domain/item";
import { Cart } from "../../modules/cart/domain/cart";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const ItemFooter = (props : {chosenSize : Price, amount : number, setAmount:(number : number) => void, item : Item | undefined, observations : string}) => {
    const formatter = new Intl.NumberFormat('br-BR', {
        style : "currency",
        currency: "BRL"
    })
    const navigate = useNavigate()
    const {cart} = useContext(CartContext)
    let item : Item | undefined = undefined
    let itemValue : IItemWithObservations
    if (props.item) {
        itemValue = JSON.parse(JSON.stringify(props.item.props))
        itemValue.observations = props.observations
        itemValue.prices = [props.chosenSize]
        item = Item.create(itemValue)
    }

   

    return(
        <div className='fixed bottom-0 px-6 pt-2 bg-white border-t-[1px] rounded-t-xl w-full h-[15%]'>
            
            <div className='flex flex-row w-full justify-between '>
                
                <div className='flex flex-col w-24  '>
                    <p className="font-semibold text-md text-gray-600">
                        Preço
                    </p>
                    <p className="font-semibold text-xl ">
                        R${(props.chosenSize.price * props.amount).toFixed(2).replace('.', ",")}
                    </p>
                </div>

                <div className='flex flex-row gap-4  items-center '>
                    <CiCircleMinus onClick={() => (props.amount > 1? props.setAmount(props.amount - 1) : '')} color={"#ef4444"} size={40}/>
                    <p className="font-semibold text-xl ">
                        {props.amount}
                    </p>
                    <CiCirclePlus onClick={() => (props.amount < 10? props.setAmount(props.amount + 1) : '')} color={"#ef4444"} size={40}/>

                </div>
                
            </div>
            <button onClick={() => (item && itemValue && cart? (cart?.addToCart(Array(props.amount).fill(item)), navigate("/")) : "")} className="w-full flex flex-row items-center justify-center h-[40%] my-2 rounded-xl text-white font-semibold bg-red-500">
                <IoCartOutline  size={32} color={"#FFFFFF"}/>

                <p>&nbsp;Adicionar ao carrinho </p>
            </button>

        </div>
    )
}