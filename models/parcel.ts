import { calculateWeightCost } from "../utils/helpers";
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
    constructor(weight:number) {
        super()
        this.cost = 300 + calculateWeightCost(weight,1000,200)
        this.type = 'Small'
        
    }
}

export class MediumParcel extends Item {
    constructor(weight:number) {
        super()
        this.cost = 800 + calculateWeightCost(weight,3000,200)
        this.type = 'Medium'
        
    }
}

export class LargeParcel extends Item {
    constructor(weight:number) {
        super()
        this.cost = 1500 + calculateWeightCost(weight,6000,200)
        this.type = 'Large'
        
    }
}

export class XLParcel extends Item {
    constructor(weight:number) {
        super()
        this.cost = 2500 + calculateWeightCost(weight,10000,200)
        this.type = 'XL'
        
    }
}

export class HeavyParcel extends Item {
    constructor(weight:number) {
        super()
        this.cost = 5000 + calculateWeightCost(weight,50000,100)
        this.type = 'Heavy'
        
    }
}

export class SpeedyShipping extends Item {
    constructor(items:Item[]) {
        super()
        this.cost = items.map(item=>item.cost).reduce((partialSum, a) => partialSum + a, 0)
        this.type = 'Shipping'
    }
}

export class Discount extends Item {
    constructor(cost) {
        super()
        this.cost = -cost
        this.type = 'Discount'
    }
}