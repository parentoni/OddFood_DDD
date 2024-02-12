import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../../modules/food/context/itemsContext";
import { DailyItemContainer } from "./dailyItemBox";
import { MainHeader } from "./MainHeader";
import { RecentOrder, RECENT_ORDERS_KEY } from "../../utils/functions/createOrder";
import { RecentOrderBox } from "./recentOrders";
import { Cart } from "../../modules/cart/domain/cart";
import { Item } from "../../modules/food/domain/item";
import { Items } from "../../modules/food/domain/items";
export const MainPage = () => {
    const navigate = useNavigate()
    const {items} = useContext(FoodContext)
    const dailyItem = items?.getDailyItem()
    const primaryItems = items?.getPrimary()
    const secondaryItems = items?.getSecondary()
    const recentOrders = localStorage.getItem(RECENT_ORDERS_KEY)

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
                    <div className=" overflow-x-auto   gap-2 min-h-[100px] flex h-[100px] w-full">
                        {recentOrders && JSON.parse(recentOrders).length > 0?
                        JSON.parse(recentOrders).reverse().map((order : RecentOrder) => {
                            
                            return (

                                <RecentOrderBox  order={order}/>

                            )
                        })
                        :
                        ""    
                    }
                </div>
                    

                    <h2 className='text-xl font-semibold py-1'>Prato principais</h2>
                        <div className='h-full w-full flex flex-col'>
                            {primaryItems?.map((item) => {
                                return (
                                        <div onClick={() => navigate(`/item/${item.props._id}`)} className="w-full h-[80px] flex flex-row pb-2 border-b-[1px]   pt-1 my-1  ">
                                            <div className='flex flex-col w-[70%]  pr-1'>
                                                <p className=' text-sm font-semibold'>{item?.props.name}</p>
                                                <p className='text-xs font-semibold text-gray-600' >{item?.props.description}</p>
                                                <p className='text-sm font-semibold text-gray-800' >A partir de R${item.getCheapestPrice()},00</p>
                                            </div>
                                            <div className='w-[30%] flex rounded-md items-center  bg-gray-100  flex-1 justify-center'>
                                                <img className=" object-cover h-full" src={item?.props.image}/>
                                            </div>
                                        </div>
                                   
                                )
                            })}
                        
                        <h2 className='text-xl font-semibold py-1'>Acompanhamentos</h2>
                        
                            {secondaryItems?.map((item) => {
                                return (
                                    
                                        <div onClick={() => navigate(`/item/${item.props._id}`)} className="w-full  h-[80px] flex flex-row pb-2 border-b-[1px]   pt-1 my-1  ">
                                            <div className='flex flex-col w-[70%]  pr-1'>
                                                <p className=' text-sm font-semibold'>{item?.props.name}</p>
                                                <p className='text-xs font-semibold text-gray-600' >{item?.props.description}</p>
                                                <p className='text-sm font-semibold text-gray-800' >A partir de R${item.getCheapestPrice()},00</p>
                                            </div>
                                            <div className='w-[30%] flex rounded-md items-center  bg-gray-100  flex-1 justify-center'>
                                                <img className=" object-cover h-full" src={item?.props.image}/>
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