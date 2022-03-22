import { expect } from 'chai'
import {calculateWeightCost} from './helpers'

 describe('Additional weight price calculation', async function () {
    it('should return the correct price', async function () {
       expect(calculateWeightCost(2000,1000,200)).to.equal(200)
       expect(calculateWeightCost(3000,1000,200)).to.equal(400)
    })
})