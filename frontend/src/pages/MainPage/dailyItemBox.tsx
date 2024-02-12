import { useNavigate } from "react-router-dom"
import { Item } from "../../modules/food/domain/item"

export const DailyItemContainer = (props : {dailyItem : Item}) => {
    const navigate = useNavigate()

    return (
            <div onClick={() => navigate(`/item/${props.dailyItem.props._id}`)} className="w-full  h-[18%] flex flex-row bg-gray-100 rounded-lg px-2   py-2 my-2  ">
                <div className='flex flex-col w-[70%] pr-1'>
                    <p className='text-md font-semibold'>{props.dailyItem?.props.name}</p>
                    <p className='text-xs font-semibold text-gray-600' >{props.dailyItem?.props.description}</p>
                    <p className='text-sm font-semibold text-gray-800' >A partir de R${props.dailyItem.getCheapestPrice().toFixed(2).replace('.', ',')}</p>
                </div>
                <div className='w-[30%]'>
                    <img className=" rounded-lg w-full h-full" src={props.dailyItem?.props.image}/>
                </div>
            </div>
    )
}