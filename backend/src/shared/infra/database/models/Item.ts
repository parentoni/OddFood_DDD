import mongoose from "mongoose";
//special day: 0 === no special day
export interface Price {
    name : string,
    price : number,
    cost : number
}

const ItemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    prices : {type : Array<Price>, required : true},
    description : {type : String, required : true},
    image : {type : String, required : false},
    isPrimary : {type : Boolean, required : true},
    specialDay : {type : Number, required: true}
})

export interface IItemNoId {
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    specialDay : number,
}

export interface IItem {
    _id : string,
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    specialDay : number,
}

export interface IItemWithObservations {
    _id : string,
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    specialDay : number,
    observations : string 
}

const ItemModel = mongoose.model('item', ItemSchema)

export { ItemModel }
