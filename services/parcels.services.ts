
import { SmallParcel, MediumParcel, LargeParcel, XLParcel, Item } from '../models/parcel'
interface parcelInput {
    xDimension:number,
    yDimension:number,
    zDimension:number,
}

const ParcelsService = () => {
  return {
    async getCost(parcels:parcelInput[]):Promise<{items:Item[],total:number}> {
      try {
        
       return {items:[], total:5}
      }
      catch (error) {
       throw error
      }
    },
    
  }
}

export default ParcelsService