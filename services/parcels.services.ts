
import { SmallParcel, MediumParcel, LargeParcel, XLParcel, Item, SpeedyShipping, HeavyParcel, Discount } from '../models/parcel'
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
                let items = parcels.map(parcel => {
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
                /* 
                 calculate best small discount combos and best medium discount combos.
                 Solution is much simpler without mixed discounts
                 as small and medium don't clash
                 */
                const discounts = []
                // apply small parcel mania
                // sort small parcels by cost, highest cost first
                const smallParcels = items.filter(item => item.type === "Small").sort((a, b) => { return b.cost - a.cost })
                // filter the list to every 3rd parcel to get a list of parcels that will be free
                const discountedSmallParcels = smallParcels.filter((item, index) => (index + 1) % 4 === 0)
                // create a discount object for every small parcel in the list
                discountedSmallParcels.map(item => {
                    const discount = new Discount(item.cost)
                    discounts.push(discount)
                })
                // apply medium parcel mania
                // sort medium parcels by cost, highest cost first
                const mediumParcels = items.filter(item => item.type === "Medium").sort((a, b) => { return b.cost - a.cost })
                // filter the list to every 3rd parcel to get a list of parcels that will be free

                const discountedMediumParcels = mediumParcels.filter((item, index) => (index + 1) % 3 === 0)
                // create a discount object for every small parcel in the list
                discountedMediumParcels.map(item => {
                    const discount = new Discount(item.cost)
                    discounts.push(discount)
                })

                items = [...items, ...discounts]
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