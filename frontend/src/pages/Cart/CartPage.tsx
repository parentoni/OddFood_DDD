import { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CartContext } from "../../modules/cart/context/cartContext";
import { Item } from "../../modules/food/domain/item";
import { FaPlus } from "react-icons/fa";
import { EmptyCartContainer } from "./emptyCarContainer";
import { IoCartOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import { QrCodePage } from "./qrCodePage";
import { CartFooter } from "./cartFooter";
import { useNavigate } from "react-router-dom";
export const CartPage = () => {
    const navigate = useNavigate()
    const {cart} = useContext(CartContext)
    const [cartItemsAndAmount, setCartItemsAndAmount] = useState<{items : Item[], amounts : number[]} | undefined>(undefined)
    //undefined means button is loading
    const [bought, setBought] = useState<{message : string} | null>(null)

    useEffect(() => {
        setCartItemsAndAmount(cart?.getItemsWithAmount())
    }, [cart?.cart.items.length])
    // cartItemsAndAmount[0] == items, [1] == amounts
    return (
        <div className="h-screen w-screen ">
            <div className='h-full w-full p-6 '>

                <header onClick={() => {console.log(cart?.getItemsWithAmount())}} className="h-[10%] justify-between w-full flex flex-col">
                    <FaArrowLeft className="  " onClick={() => navigate("/")} size={24}/>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <h1 className='text-4xl font-semibold'>Carrinho</h1>
                        <div className="bg-red-500 w-10 items-center flex justify-center rounded-lg aspect-square ">
                            <IoCartOutline  size={32} color={"#FFFFFF"}/>
                        </div>
                        
                    </div>
                </header>
                <div className="h-[90%] w-full flex flex-col ">
                    {cartItemsAndAmount && cartItemsAndAmount.items.length > 0 && bought === null ? cartItemsAndAmount.items.map((item, index) => {
                        return (
                            <div  className="w-full  h-[17%] bg-gray-100  flex flex-row rounded-lg px-2   py-2 my-2  ">
                                <div className='w-[30%]'>
                                    <img className=" rounded-lg w-full h-full" src={item.props.image}/>
                                </div>
                                <div className='flex flex-col justify-between w-[70%] pl-4'>
                                    <div>
                                        <p className='text-md font-semibold'>{item.props.name}</p>
                                        <p className='text-md font-semibold ' >R${item.props.prices[0].price.toFixed(2).replace('.', ',')}</p>
                                        <p className='text-xs font-semibold text-gray-600' >{item.props.observations? ` Observacoes: ${item.props.observations}`: ""}</p>
                                    </div>
                                    <div className='flex flex-row w-[40%] h-8 rounded-md justify-between items-center bg-gray-100 '>
                                        <div className='w-[33%] h-full rounded-l-md flex items-center justify-center bg-red-500'>
                                            <FaMinus onClick={() => (cart?.removeFromCart(item),  setCartItemsAndAmount(cart?.getItemsWithAmount()))} color={"#FFFFFF"} />
                                        </div> 
                                        <p className="font-semibold text-xl ">
                                            {cartItemsAndAmount.amounts[index]}
                                        </p>
                                        <div className='w-[33%] rounded-r-md h-full flex items-center justify-center bg-red-500'>
                                            <FaPlus onClick={() => (cart?.addToCart([item]),  setCartItemsAndAmount(cart?.getItemsWithAmount()))} color={"#FFFFFF"} />

                                        </div> 

                                    </div>
                                </div>
                                
                            </div>
                            // <div className='h-[15%] w-full flex flex-row'>
                            //     <img className={"rounded-lg"} src={item.props.image}/>
                            // </div>
                        )
                    }) :
                    bought === null?
                       <EmptyCartContainer/> :
                       
                       <QrCodePage message={bought}/>
                            
                    }
                    <CartFooter setBought={setBought} bought={bought}/>
                </div>
              


            </div>
            {/* <CartFooter/> */}
        </div>
    )
}