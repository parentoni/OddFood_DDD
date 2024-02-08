
import mongoose from "mongoose";
import { IItemWithObservations } from "./Item";
//special day: 0 === no special day

export interface IOrderItem {
    _id : string,
    name : string,
    cost : number,
    observations : string,
    price : number,
    size : string
}

export interface IOrderWithoutId {
    username : string,
    items : any,
    payment : string,
    date : string,
    paid : boolean,
}

const OrderSchema = new mongoose.Schema({
    username : {type : String, required : true},
    items : {type : Array<IOrderItem>, requried : true},
    payment : {type : String, required : true},
    date : {type : String, required : true},
    paid : {type : Boolean, required: true}
})

export interface IOrder {
    username : string,
    items : any,
    payment : string,
    date : string,
    paid : boolean,
    _id : string
}

const OrderModel = mongoose.model('order', OrderSchema)

export { OrderModel }
