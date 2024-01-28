import mongoose from "mongoose";

export interface Price {
    name : string,
    price : number
}

const ItemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    prices : {type : Array<Price>, required : true},
    description : {type : String, required : true},
    image : {type : String, required : false},
    isPrimary : {type : Boolean, required : true},
    cost : {type : Number, required : true},
    specialDay : {type : Number, required: true}
})

export interface IItemNoId {
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    cost : number,
    specialDay : number,
}

export interface IItem {
    _id : string,
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    cost : number,
    specialDay : number,

}

export default { name: "item", schema: ItemSchema}