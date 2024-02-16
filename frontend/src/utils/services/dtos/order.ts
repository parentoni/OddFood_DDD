export interface IOrderWithDate {
    username : string,
    items : any,
    date : Date,
    paid : boolean,
    _id : string
}

export interface IOrder {
    username : string,
    items : any,
    date : string,
    paid : boolean,
    _id : string
}

export interface IOrderWithoutId {
    username : string,
    items : any,
    date : string,
    paid : boolean,
}

export interface IOrderItem {
    cost : number, 
    name : string,
    observations : string,
    price : number,
    size : string,
    _id : string
}