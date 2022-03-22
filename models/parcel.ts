export class Item{
    cost:number // unit for cost is cent e.g $5 = 500
    type:string
    id:number
    static count = 0; // Stores count of number of instances created
    constructor(){
        this.id = ++Item.count;
    }
}

export class SmallParcel extends Item {
    constructor() {
        super()
        this.cost = 300
        this.type = 'Small'
        
    }
}

export class MediumParcel extends Item {
    constructor() {
        super()
        this.cost = 800
        this.type = 'Medium'
        
    }
}

export class LargeParcel extends Item {
    constructor() {
        super()
        this.cost = 1500
        this.type = 'Large'
        
    }
}

export class XLParcel extends Item {
    constructor() {
        super()
        this.cost = 2500
        this.type = 'XL'
        
    }
}

export class SpeedyShipping extends Item {
    constructor(items:Item[]) {
        super()
        this.cost = items.map(item=>item.cost).reduce((partialSum, a) => partialSum + a, 0)
        this.type = 'Shipping'
    }
}