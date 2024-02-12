import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../modules/cart/context/cartContext"
import { createOrder } from "../../utils/functions/createOrder"
import { IOrder } from "../../utils/services/dtos/order"

export let NAME_KEY = "ODDFOOD_NAME"

export const CartFooter = (props : {setBought : (prop : {message : string}) => void, bought : {message : string} | null}) => {
    const {cart} = useContext(CartContext)
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() =>{
        setLoading(false)
        const savedName = localStorage.getItem(NAME_KEY)
        if (savedName) {
            setName(savedName)
        }
    }, [])



    return (
        <div className="flex flex-col pb-6 border-t-2 pt-2">
            {props.bought === null? 
            <>
                        <div className="flex  flex-row w-full justify-between">
                            <p className='text-4xl '>Total:</p>
                            <p className='text-3xl font-semibold '>R${cart?.getPrice().toFixed(2).replace('.', ',')}</p>
                            
                        </div>
                        <div className="flex my-2 flex-row justify-between items-center">
                            <p className='text-2xl '>Nome:&nbsp;</p>
                            <input value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Ex: Henrique Parentoni Aguiar" className='h-full bg-gray-50 border-b-2 outline-[1px] px-1  rounded-b-none border-gray-600 '/>
                        </div>
                        <p className='text-sm font-semibold text-gray-600 '>Coloque seu nome real para a entrega do pedido.</p>
                        <button onClick={() => {cart? createOrder(cart, name, setLoading).then((res) => {
                            if (res.isLeft()) {
                                console.log("Ocorreu um erro")
                            } else {
                                props.setBought(res.value)
                            }
                        }) : console.log("ERRO")}} disabled={cart?.cart.items.length === 0 || cart?.cart.items.length === undefined || loading === true? true : false} className={`w-full ${cart?.cart.items.length === 0 || cart?.cart.items.length === undefined? "bg-red-300" : "bg-red-500 active:bg-red-600"} flex flex-row items-center  justify-center h-16 my-2 rounded-xl text-white font-semibold `}>
                            {loading === true?
                             <div className=" w-12 h-12 border-[10px] border-t-red-200 border-red-300  rounded-full animate-spin "></div>

                             
                            :    
                            <p className="text-xl">Gerar QR code para pagamento</p>

                        }

                        </button>
                        </>
:                       <button onClick={() => {props.bought !== null?  navigator.clipboard.writeText(props.bought.message) : console.log('asdasdasdasd')}} className="w-full  flex active:bg-red-600 flex-row items-center justify-center h-16 my-2 rounded-xl text-white font-semibold bg-red-500">
                            <p className="text-xl">Copiar codigo</p>
                        </button>
}
                    </div>
    )
}