import { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../modules/cart/context/cartContext";

export const MainHeader = () => {
    const navigate = useNavigate()
    const {cart} = useContext(CartContext)
    return (
        <header className='h-[5%] flex flex-col mb-6'>
                <div className=" h-[100%] flex flex-row justify-between items-center w-full  ">
                    <h1 className='text-3xl font-semibold'>OddFood</h1>
                    
                    <button onClick={() => {navigate('/cart')}} className=' bg-red-500 px-1 flex flex-row items-center justify-around h-full w-20 rounded-lg'>
                        <IoCartOutline  size={32} color={"#FFFFFF"}/>
                        <p className='text-3xl text-white'>{cart?.getSize() === undefined? 0 : cart?.getSize()}</p>
                        
                    </button>
                </div>

                <p className="flex flex-row mt-[2px]"><p className="text-red-500 font-semibold">AVISO:&nbsp;</p>Aceitamos pedidos até as&nbsp;<p className="text-red-500 font-semibold">11:15</p></p>

            </header>
    )
}