import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../modules/cart/context/cartContext"
import { createOrder } from "../../utils/functions/createOrder"
import { IOrder } from "../../utils/services/dtos/order"

export let NAME_KEY = "ODDFOOD_NAME"

export const CartFooter = () => {
    const {cart} = useContext(CartContext)
    const [name, setName] = useState<string>("")
    useEffect(() =>{
        const savedName = localStorage.getItem(NAME_KEY)
        if (savedName) {
            setName(savedName)
        }
    }, [])

    return (
        <div className="flex flex-col pb-6 border-t-2 pt-2">
                        <div className="flex  flex-row w-full justify-between">
                            <p className='text-4xl '>Total:</p>
                            <p className='text-3xl font-semibold '>R${cart?.getPrice().toFixed(2).replace('.', ',')}</p>
                            
                        </div>
                        <div className="flex my-2 flex-row justify-between items-center">
                            <p className='text-2xl '>Nome:&nbsp;</p>
                            <input value={name} onChange={(e) => {setName(e.target.value)}} className='h-full bg-gray-50 border-b-2 outline-[1px] px-1  rounded-b-none border-gray-600 '/>
                        </div>
                        <p className='text-sm font-semibold text-gray-600 '>Coloque seu nome real para a entrega do pedido.</p>
                        <button onClick={() => {cart? createOrder(cart, name).then((res) => {
                            if (res.isLeft()) {
                                alert("Ocorreu um erro")
                            } else {
                                console.log("EBA!")
                            }
                        }) : alert("ERRO")}} className="w-full flex flex-row items-center justify-center h-16 my-2 rounded-xl text-white font-semibold bg-red-500">
                            <p>Gerar QR code para pagamento </p>
                        </button>

                    </div>
    )
}