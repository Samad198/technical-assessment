
import { SmallParcel, MediumParcel, LargeParcel, XLParcel, Item, SpeedyShipping } from '../models/parcel'
interface parcelInput {
    xDimension: number,
    yDimension: number,
    zDimension: number,
    weight:number
}

const ParcelsService = () => {
    return {
        async getCost(parcels: parcelInput[],speedyShipping=false): Promise<{ items: Item[], total: number }> {
            try {
                const items = parcels.map(parcel => {
                    const { xDimension, yDimension, zDimension, weight } = parcel
                    if (!xDimension || !yDimension || !zDimension) {
                        throw 'Error: an input parcel does not contain a dimension. Dimensions are required'
                    }
                    if (typeof xDimension !== "number" || typeof yDimension !== "number" || typeof zDimension !== "number") {
                        throw 'Error: dimensions must be numbers'
                    }
                    const parcelDimensions = xDimension * yDimension * zDimension
                    if (parcelDimensions < 10) return new SmallParcel(weight)
                    else if (parcelDimensions < 50) return new MediumParcel(weight)
                    else if (parcelDimensions < 100) return new LargeParcel(weight)
                    else return new XLParcel(weight)
                })
                if(speedyShipping){
                    items.push(new SpeedyShipping(items))
                }
                const total = items.map(item => item.cost).reduce((partialSum, a) => partialSum + a, 0)
                return { items, total }
            }
            catch (error) {
                throw error
            }
        },

    }
}

export default ParcelsService