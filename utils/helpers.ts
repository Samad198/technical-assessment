export const calculateWeightCost = (weight, limit,addition) =>{
    return (Math.floor((Math.max(0, (weight - limit))/1000))*addition)
}