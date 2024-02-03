import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { HiOutlineEmojiSad } from "react-icons/hi";


export const EmptyCartContainer = () => {
    
    return (
        <div className="w-full rounded-lg flex px-4 items-center  flex-col justify-center my-2 h-[70%] bg-gray-100">
            <HiOutlineEmojiSad  size={128} color={"#ef4444"} />
            <h1 className='text-3xl font-semibold text-center'>Seu carrinho esta vazio</h1>
            <p className='text-xl font-semibold text-center'>Volte para a pagina inicial para fazer um pedido</p>

        </div>
    )
}