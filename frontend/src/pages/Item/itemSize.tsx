import { Item } from "../../modules/food/domain/item"
import { Price } from "../../utils/services/dtos/item"

export const ItemSize = (props : {price : Price, chosenSize : Price, setChosenSize : (price : Price) => void}) => {
    return (
      
             <div onClick={() => {props.setChosenSize(props.price)}} className={`w-full  h-12 rounded-lg flex items-center pl-2 border-black  ${props.chosenSize === props.price? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                                    <p className='font-semibold'>{props.price.name}</p>
                                </div>
        
    )
}