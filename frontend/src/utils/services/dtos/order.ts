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