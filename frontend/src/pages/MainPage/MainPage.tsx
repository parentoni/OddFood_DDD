import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../../modules/food/context/itemsContext";
import { DailyItemContainer } from "./dailyItemBox";
import { MainHeader } from "./MainHeader";
export const MainPage = () => {
    const navigate = useNavigate()
    const {items} = useContext(FoodContext)
    const dailyItem = items?.getDailyItem()
    const primaryItems = items?.getPrimary()
    const secondaryItems = items?.getSecondary()
    return (
        <div className="h-screen w-screen ">
            <div className='h-full w-full p-6'>
                <MainHeader/>

                <div className='flex flex-col w-full h-full '>
                    <h2 className='text-xl font-semibold'>Prato do dia</h2>
                    {dailyItem?.isRight() ?
                    <DailyItemContainer dailyItem={dailyItem.value}/>
: ''
                    }
                    <h2 className='text-xl font-semibold'>Combina com voce</h2>
                    <span className="text-sm font-semibold text-gray-600">Baseado em seus ultimos pedidos</span>

                    

                    <h2 className='text-xl font-semibold py-1'>Prato principais</h2>
                        <div className='h-full w-full flex flex-col'>
                            {primaryItems?.map((item) => {
                                return (
                                    
                                        <div onClick={() => navigate(`/item/${item.props._id}`)} className="w-full  h-[16%] flex flex-row pb-2 border-b-[1px]   pt-1 my-1  ">
                                            <div className='flex flex-col w-[70%] pr-1'>
                                                <p className=' text-sm font-semibold'>{item?.props.name}</p>
                                                <p className='text-xs font-semibold text-gray-600' >{item?.props.description}</p>
                                                <p className='text-sm font-semibold text-gray-800' >A partir de R${item.getCheapestPrice()},00</p>
                                            </div>
                                            <div className='w-[30%]'>
                                                <img className=" rounded-md w-full h-full" src={item?.props.image}/>
                                            </div>
                                        </div>
                                   
                                )
                            })}
                        
                        <h2 className='text-xl font-semibold py-1'>Acompanhamentos</h2>
                        
                            {secondaryItems?.map((item) => {
                                return (
                                    
                                        <div onClick={() => navigate(`/item/${item.props._id}`)} className="w-full  h-[16%] flex flex-row pb-2 border-b-[1px]   pt-1 my-1  ">
                                            <div className='flex flex-col w-[70%] pr-1'>
                                                <p className=' text-sm font-semibold'>{item?.props.name}</p>
                                                <p className='text-xs font-semibold text-gray-600' >{item?.props.description}</p>
                                                <p className='text-sm font-semibold text-gray-800' >A partir de R${item.getCheapestPrice()},00</p>
                                            </div>
                                            <div className='w-[30%]'>
                                                <img className=" rounded-md w-full h-full" src={item?.props.image}/>
                                            </div>
                                        </div>
                                   
                                )
                            })}
                        </div>

                </div>


            </div>
        </div>
    )
}