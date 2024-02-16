import { useEffect, useState } from "react"
import { getItemsAndAmounts } from "../../utils/functions/getItemsAndAmounts"
import { Api } from "../../utils/services/Api"
import { IOrder, IOrderItem } from "../../utils/services/dtos/order"
export const DailyOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>()
    const [ordersWithAmount, setOrdersWithAmount] = useState<{items : IOrderItem[], amounts : number[]}>()
    const [totalPrice, setTotalPrice] = useState<number>()
    let price = 0
    useEffect(() => {
        Api.getDailyOrders().then((res) => {
            if (res.isRight()) {
                setOrders(res.value)

                const allItems = []

                for (const order of res.value) {
                    for (const item of order.items) {
                        allItems.push(item)
                    
                    }
                }

                allItems.map((item) => {
                    price += item.cost
                    console.log(price)
                    setTotalPrice(price)
                })

                setOrdersWithAmount(getItemsAndAmounts(allItems))
            }
        })

        
        // console.log(price)

    }, [])


    // console.log(orders)

    return (
        <div className="h-screen w-screen ">
            <div className='h-full w-full p-6'>
                <div className="w-full flex-col border-b pb-2">
                    <h1 className='text-xl'>Pedidos sem nome</h1>
                    {ordersWithAmount?.items?.map((order, index) => {


                        return (
                            <p>{ordersWithAmount.amounts[index]}x {order.name} - {order.size} {order.observations? "- " + order.observations : ""}</p>
                        )
                    })}
                </div>
                <div className="w-full flex-col border-b pb-2">
                    <h1 className='text-xl'>Pedidos com nome</h1>

                    {orders?.map((order) => {

                        return(
                            <div>
                                <p className='text-lg font-semibold'>*{order.username}:*</p>
                                {order.items.map((item : any) => {
                                    return(
                                        <p>{item.name} - {item.size}{item.observations? " - " + item.observations : ""}</p>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <p>Total sem desconto: R${totalPrice?.toFixed(2).replace('.', ",")}</p>
            </div>
        </div>
    )

}