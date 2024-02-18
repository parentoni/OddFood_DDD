import { Either, left, right } from "../shared/Result"
import { IItem } from "./dtos/item"
import { IOrder, IOrderWithDate } from "./dtos/order"

export class Api {
    static baseUrl = "https://api.oddfood"

    public static async getAllItems() : Promise<Either<Response, IItem[]>> {
        const response = await fetch(this.baseUrl + "/item/all", {
            method : "GET",
        })

        if (response.ok) {
            return right(await response.json())
        }
        return left(response)
    }

    public static async createOrder(props : any) : Promise<Either<Response, {message : string}>> {

        const response = await fetch(this.baseUrl + "/order/create", {
            method: "POST",
            headers : {Accept : "application/json", "Content-Type" : "application/json"},
            body: JSON.stringify(props)
        })
        
        if (response.ok) {
            return right(await response.json())
        }

        return left(response)
    }

    public static async getOrder(id : string) : Promise<Either<Response, IOrder>> {
        const response = await fetch(this.baseUrl + `/order/${id}`, {
            method : "GET",
        })

        if (response.ok) {

            return right(await response.json())
        }

        return left(response)

    }
    public static async getDailyOrders() : Promise<Either<Response, IOrder[]>> {
        const response = await fetch(this.baseUrl + "/order/daily", {
            method : "GET"
        })

        if (response.ok) {

            return right(await response.json())
        }

        return left(response)
    }

}