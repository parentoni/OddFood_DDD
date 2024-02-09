
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
    date : string,
    paid : boolean,
}

const OrderSchema = new mongoose.Schema({
    username : {type : String, required : true},
    items : {type : Array<IOrderItem>, requried : true},
    date : {type : Date, required : true},
    paid : {type : Boolean, required: true}
})

export interface IOrder {
    username : string,
    items : any,
    date : string,
    paid : boolean,
    _id : string
}

export interface IOrderWithDate {
    username : string,
    items : any,
    date : Date,
    paid : boolean,
    _id : string
}

const OrderModel = mongoose.model('order', OrderSchema)

export { OrderModel }
