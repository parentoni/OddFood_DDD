import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FoodContext } from "../../modules/food/context/itemsContext"
import { IoClose } from "react-icons/io5";
import { Price } from "../../utils/services/dtos/item";
import { ItemSize } from "./itemSize";
import { CartContext } from "../../modules/cart/context/cartContext";
import { ItemFooter } from "./itemFooter";

export const ItemPage = () => {
    const navigate = useNavigate()
    const {items} = useContext(FoodContext)
    let item 
    let {itemId} = useParams()
    const itemOrError = items?.getItemById(itemId as string)

    if (itemOrError?.isLeft()) {
        alert("Um erro inesperado aconteceu ao encontrar o item [Erro 2]")
        navigate('/')
        
    } else {
        item = itemOrError?.value
    }

    useEffect(() => {
        const response = items?.getItemById(itemId as string)
        if (response && response.isRight()) {
            setChosenSize(response.value.props.prices[0])
        }

    }, [item?.props.prices])

    const [chosenSize, setChosenSize] = useState<Price>(item?.props.prices? item.props.prices[0] : {price : 0, name : 'Indefinido', cost : 1})
    
    const [observations, setObservations] = useState<string>("")
    const [amount, setAmount] = useState<number>(1)
    return (
        <div className={`h-screen w-screen `}>
            <div className={` h-[75%] w-full`}>
                <div className='h-[40%] w-full ' >
                    <button onClick={() => navigate('/')} className="aspect-square rounded-full ml-4 mt-4  bg-white absolute   w-12 h-12 flex items-center justify-center">
                        <IoClose className="" size={24}/>
                    </button>

                    <img className=' h-full w-full ' src={item?.props.image}/>
                    
                </div>
                <div className='h-[60%] -mt-4 flex flex-col px-6 pt-3 bg-white opacity-[99%] rounded-t-2xl border-t-2 w-full'>
                    <h1 className=" self-center font-semibold pb-1 text-2xl">{item?.props.name}</h1>
                    
                    <h2 className='text-lg font-semibold '>Descrição:</h2>
                    <span className="text-md  leading-5  text-gray-600 font-semibold ">
                        {item?.props.description}
                    </span>
                    {item?.props.prices.length && item.props.prices.length > 1? 

                    <div>
                        <h2 className='text-lg font-semibold pt-2'>Escolha um tamanho:</h2>
                        <div className="flex flex-col gap-2 w-full">
                            
                            {item?.props.prices.map((price) => {
                                
                                return (
                                    <ItemSize price={price} chosenSize={chosenSize} setChosenSize={setChosenSize}/>
                                )
                            })}

                        
                        </div>
                    </div>
: ""}
                    <div className="w-full flex flex-row justify-between">
                        <h2 className='text-lg font-semibold pt-2'>Alguma observação?</h2>
                        <span className="pt-2 text-md  text-gray-600">{observations.length}/80</span>
                    </div>
                    <textarea onChange={ (e) => (e.target.value.length <= 80? setObservations(e.target.value) : '')} value={observations} className='border-2 rounded-lg p-2 min-h-12'  placeholder="Ex: Sem feijão"/>

                    

                </div>
               
            </div>
            <ItemFooter chosenSize={chosenSize} amount={amount} setAmount={setAmount} item={item? item : undefined} observations={observations} />

        </div>
    )
}