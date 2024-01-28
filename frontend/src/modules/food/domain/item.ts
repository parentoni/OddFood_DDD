
export interface Price {
    name : string,
    price : number
}


export interface IItem {
    _id : string,
    name : string,
    prices : Price[],
    description : string,
    image : string,
    isPrimary : Boolean,
    cost : Number,
    specialDay : Number,
}

export class Item {

    props : IItem

    constructor(props : IItem) {
        this.props = props
    }

    public static create(props : IItem) {
        return new Item(props)
    }

    
}
