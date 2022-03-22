import { expect } from 'chai'
import { LargeParcel, MediumParcel, SmallParcel, XLParcel, SpeedyShipping, HeavyParcel, Discount } from '../models/parcel'
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
        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 1000 },
        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 },
        { xDimension: 5, yDimension: 5, zDimension: 5, weight: 1000 },
    ]
let output
let speedyOutput

describe('Parcel service tests', async function () {
    before('Set any global variables as mocha does not allow to be declared inside describe', async function () {
        output = await ParcelsService.getCost(input)
        speedyOutput = await ParcelsService.getCost(input, true)
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
        it('Should not have a speedy shipping charge', async function () {
            expect(output.items.length).to.equal(4)
        })
        it('Total should be the sum of all the prices', async function () {
            expect(output.total).to.equal(300 + 800 + 1500 + 2500)
        })
        describe('Speedy shipping', async function () {
            it('Should double the cost of the order', async function () {
                expect(speedyOutput.total).to.equal((300 + 800 + 1500 + 2500) * 2)
            })
            it('Should add an extra item to the output list', async function () {
                expect(speedyOutput.items.length).to.equal(5)
                expect(speedyOutput.items[4] instanceof SpeedyShipping).to.equal(true)
            })
            it('Should not impact the price of individual items', async function () {
                expect(speedyOutput.items[0].cost).to.equal(300)
                expect(speedyOutput.items[1].cost).to.equal(800)
                expect(speedyOutput.items[2].cost).to.equal(1500)
                expect(speedyOutput.items[3].cost).to.equal(2500)
            })
        })
        describe('Discounts', async function () {
            it('Every 4th small parcel in an order should be free', async function () {
                const smallDiscountInput =
                    [
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 }, // price $3
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 }, // price $5
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },

                    ]
                const discountedOutput = await ParcelsService.getCost(smallDiscountInput)
                expect(discountedOutput.items[0].cost).to.equal(300)
                expect(discountedOutput.items[6].cost).to.equal(500)
                expect(discountedOutput.items[8] instanceof Discount).to.equal(true)
                expect(discountedOutput.items[9] instanceof Discount).to.equal(true)
                expect(discountedOutput.total).to.equal(2400)
            })

            it('Every 3rd medium parcel in an order should be free', async function () {
                const mediumDiscountInput =
                    [
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 1000 }, // price 8
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 1000 },
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 1000 },
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 }, // price 10
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 },
                        { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 },
                    ]
                const discountedOutput = await ParcelsService.getCost(mediumDiscountInput)

                expect(discountedOutput.items[0].cost).to.equal(800)
                expect(discountedOutput.items[4].cost).to.equal(1000)
                expect(discountedOutput.items[6] instanceof Discount).to.equal(true)
                expect(discountedOutput.items[7] instanceof Discount).to.equal(true)
                expect(discountedOutput.total).to.equal(3600)

            })

            xit('Every 5th parcel in an order should be free', async function () {
                const largeDiscountInput =
                    [
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 }, // price $15
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 1000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 }, // price 17
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 },
                        { xDimension: 5, yDimension: 5, zDimension: 3, weight: 11000 },
                    ]
                const discountedOutput = await ParcelsService.getCost(largeDiscountInput)
                expect(discountedOutput.items[0].cost).to.equal(1500)
                expect(discountedOutput.items[6].cost).to.equal(1700)
                expect(discountedOutput.items[10] instanceof Discount).to.equal(true)
                expect(discountedOutput.items[11] instanceof Discount).to.equal(true)
                expect(discountedOutput.total).to.equal(12800)

            })

            it('Within each discount the cheapest parcel is the free one', async function () {
                const mediumDiscountInput =
                [
                    { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 }, // price 10
                    { xDimension: 4, yDimension: 4, zDimension: 2, weight: 1000 }, // price 8
                    { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 },
                    { xDimension: 4, yDimension: 4, zDimension: 2, weight: 4000 },
                ]
            const discountedOutput = await ParcelsService.getCost(mediumDiscountInput)
            expect(discountedOutput.items[4] instanceof Discount).to.equal(true)
            expect(discountedOutput.items[4].cost).to.equal(800)
            })

            xit('The coombination of discounts which saves the most money should be selected', async function () {


            })

            it('Should not impact the price of individual items', async function () {
                const smallDiscountInput =
                    [
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 }, // price $3
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 }, // price $5
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },

                    ]
                const discountedOutput = await ParcelsService.getCost(smallDiscountInput)
                expect(discountedOutput.items[0].cost).to.equal(300)
                expect(discountedOutput.items[1].cost).to.equal(300)
                expect(discountedOutput.items[4].cost).to.equal(500)
                expect(discountedOutput.items[5].cost).to.equal(500)
            })
            it('Should only apply speedy shipping after the discount', async function () {
                const smallDiscountInput =
                    [
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 }, // price $3
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 500 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 }, // price $5
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },
                        { xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 },

                    ]
                const discountedOutput = await ParcelsService.getCost(smallDiscountInput, true)
                expect(discountedOutput.total).to.equal(4800)
            })



        })

        describe('Output type should be heavy parcel if price of heavy parcel is less than the normal version for given dimensions', async function () {
            it('heavy small parcel should use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 1, weight: 500000 }])
                expect(parcelOutput.items[0] instanceof HeavyParcel).to.equal(true)
            })
            it('heavy medium parcel should use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 4, yDimension: 4, zDimension: 2, weight: 5000000 }])
                expect(parcelOutput.items[0] instanceof HeavyParcel).to.equal(true)
            })
            it('heavy large parcel should use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 5, yDimension: 5, zDimension: 3, weight: 5000000 }])
                expect(parcelOutput.items[0] instanceof HeavyParcel).to.equal(true)
            })
            it('heavy xl parcel should use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 5, yDimension: 5, zDimension: 5, weight: 500000 }])
                expect(parcelOutput.items[0] instanceof HeavyParcel).to.equal(true)
            })

            it('lighter small parcel should not use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 1, weight: 2000 }])
                expect(parcelOutput.items[0] instanceof SmallParcel).to.equal(true)
            })
            it('lighter medium parcel should not use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 4, yDimension: 4, zDimension: 2, weight: 2000 }])
                expect(parcelOutput.items[0] instanceof MediumParcel).to.equal(true)
            })
            it('lighter large parcel should not use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 5, yDimension: 5, zDimension: 3, weight: 2000 }])
                expect(parcelOutput.items[0] instanceof LargeParcel).to.equal(true)
            })
            it('lighter xl parcel should not use heavy parcel instead', async function () {
                const parcelOutput = await ParcelsService.getCost([{ xDimension: 5, yDimension: 5, zDimension: 5, weight: 2000 }])
                expect(parcelOutput.items[0] instanceof XLParcel).to.equal(true)
            })

        })

    })



    describe('Errors should be thrown if invalid inputs are provided', async function () {
        it('Should return an error if all dimensions are not provided for any object', async function () {
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: undefined, weight: 500 }]))
        })
        it('Should return an error if any dimensions are 0 ', async function () {
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 0, weight: 500 }]))
        })
        it('Should return an error if any dimensions are not a number ', async function () {
            // @ts-ignore
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: "adadsd", yDimension: 1, zDimension: 1, weight: 500 }]))
        })
        it('Should return an error if weight is not defined', async function () {
            // @ts-ignore
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 1 }]))
        })
        it('Should return an error if weight is 0', async function () {
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 1, weight: 0 }]))
        })
        it('Should return an error if weight is not a number', async function () {
            // @ts-ignore
            await expectThrowsAsync(ParcelsService.getCost([{ xDimension: 1, yDimension: 1, zDimension: 1, weight: "dad" }]))
        })

    })



})