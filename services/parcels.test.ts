import { expect } from 'chai'
import { LargeParcel, MediumParcel, SmallParcel, XLParcel } from '../models/parcel'
import P from './parcels.services'
const ParcelsService = P()

// function to test that a method throws an error
const expectThrowsAsync = async (method) => {
    let error = null
    try {
        await method()
    }
    catch (err) {
        error = err
    }
    expect(error).to.be.an('Error')
}
// an input that contains a small parcel, a medium parcel, a large parcel, and an extra large parcel
const input =
    [
        { xDimension: 1, yDimension: 1, zDimension: 1 },
        { xDimension: 4, yDimension: 4, zDimension: 2 },
        { xDimension: 5, yDimension: 5, zDimension: 3 },
        { xDimension: 5, yDimension: 5, zDimension: 5 },
    ]
let output


describe('Parcel service tests', async function () {
    before('Set any global variables as mocha does not allow to be declared inside describe', async function () {
        output = await ParcelsService.getCost(input)
    })

    describe('If the correct input is provided then the output should be a collection of items with their individual cost and type, aswell as total cost.', async function () {
        it('Should return a small parcel when parcel dimensions add up to < 10cm', async function () {
            expect(output.items[0] instanceof SmallParcel).to.equal(true)
        })
        it('Should return a medium parcel when parcel dimensions add up to < 50cm', async function () {
            expect(output.items[1] instanceof MediumParcel).to.equal(true)
        })
        it('Should return a large parcel when parcel dimensions add up to < 100cm', async function () {
            expect(output.items[2] instanceof LargeParcel).to.equal(true)
        })
        it('Should return a xl parcel when parcel dimensions add up to >= 100cm', async function () {
            expect(output.items[3] instanceof XLParcel).to.equal(true)
        })
        it('Total should be the sum of all the prices', async function () {
            expect(output.total).to.equal(300 + 800 + 1500 + 2500)
        })
    })



    describe('Errors should be thrown if invalid inputs are provided', async function () {
        it('Should return an error if all dimensions are not provided for any object', async function () {
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: undefined }]))
        })
        it('Should return an error if any dimensions are 0 ', async function () {
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 0 }]))
        })
        it('Should return an error if any dimensions are not a number ', async function () {
            // @ts-ignore
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: "adadsd", yDimension: 1, zDimension: 1 }]))
        })

    })



})