
import { SmallParcel, MediumParcel, LargeParcel, XLParcel, Item, SpeedyShipping, HeavyParcel } from '../models/parcel'
interface parcelInput {
    xDimension: number,
    yDimension: number,
    zDimension: number,
    weight: number
}

const ParcelsService = () => {
    return {
        async getCost(parcels: parcelInput[], speedyShipping = false): Promise<{ items: Item[], total: number }> {
            try {
                const items = parcels.map(parcel => {
                    const { xDimension, yDimension, zDimension, weight } = parcel
                    if (!xDimension || !yDimension || !zDimension) {
                        throw 'Error: an input parcel does not contain a dimension. Dimensions are required'
                    }
                    if (!weight) {
                        throw 'Error: an input parcel does not contain a weight.'
                    }
                    if (typeof weight !== "number") {
                        throw 'Error: weight must be a number.'
                    }

                    if (typeof xDimension !== "number" || typeof yDimension !== "number" || typeof !zDimension == "number") {
                        throw 'Error: dimensions must be numbers'
                    }
                    const parcelDimensions = xDimension * yDimension * zDimension
                    const heavyParcel = new HeavyParcel(weight)
                    if (parcelDimensions < 10) {
                        const smallParcel = new SmallParcel(weight)
                        if (heavyParcel.cost < smallParcel.cost) return heavyParcel
                        else return smallParcel
                    }
                    else if (parcelDimensions < 50) {
                        const mediumParcel = new MediumParcel(weight)
                        if (heavyParcel.cost < mediumParcel.cost) return heavyParcel
                        else return mediumParcel
                    }
                    else if (parcelDimensions < 100) {
                        const largeParcel = new LargeParcel(weight)
                        if (heavyParcel.cost < largeParcel.cost) return heavyParcel
                        else return largeParcel
                    }
                    else {
                        const xlParcel = new XLParcel(weight)
                        if (heavyParcel.cost < xlParcel.cost) return heavyParcel
                        else return xlParcel
                    }
                })
                if (speedyShipping) {
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