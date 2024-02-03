import { Either, left, right } from "../shared/Result"
import { IItem } from "./dtos/item"

export class Api {
    static baseUrl = "http://192.168.15.23:8000"

    public static async getAllItems() : Promise<Either<Response, IItem[]>> {
        const response = await fetch(this.baseUrl + "/item/all", {
            method : "GET",
        })

        if (response.ok) {
            return right(await response.json())
        }
        return left(response)
    }

}