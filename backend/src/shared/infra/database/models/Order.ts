
import mongoose from "mongoose";
import { IItemWithObservations } from "./Item";
//special day: 0 === no special day



const OrderSchema = new mongoose.Schema({
    username : {type : String, required : true},
    items : {type : Array<IItemWithObservations>, requried : true},
    payment : {type : Boolean, required : true},
    date : {type : Date, required : true}
})

export interface IOrder {
    username : string,
    items : IItemWithObservations[],
    payment : boolean,
    date : Date
}

const OrderModel = mongoose.model('order', OrderSchema)

export { OrderModel }
