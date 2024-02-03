export interface Price {
    name : string,
    price : number,
    cost : number
}

export interface IItemNoId {
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

export interface IItem {
    _id : string,
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    specialDay : number,
    observations : string
}
