import { expect } from 'chai'
import { LargeParcel, MediumParcel, SmallParcel, SpeedyShipping, XLParcel,HeavyParcel, Discount } from './parcel'

describe('Parcel Model Tests', async function () {
    describe('Different parcel types should have the correct prices', async function () {
        describe('Small Parcel', async function () {
            it('Should return have a cost of $3', async function () {
                const smallParcel = new SmallParcel(500)
                expect(smallParcel.cost).to.equal(300)
            })
            it('Weight of 0.999kg should a cost $3', async function () {
                const smallParcel = new SmallParcel(999)
                expect(smallParcel.cost).to.equal(300)
            })
            it('Weight surplus of 4.5kg should a cost $11', async function () {
                const smallParcel = new SmallParcel(5500)
                expect(smallParcel.cost).to.equal(1100)
            })
            it('Weight surplus of 5kg should a cost $13', async function () {
                const smallParcel = new SmallParcel(6000)
                expect(smallParcel.cost).to.equal(1300)
            })
        })
        describe('Medium Parcel', async function () {
            it('Should return have a cost of $8', async function () {
                const mediumParcel = new MediumParcel(500)
                expect(mediumParcel.cost).to.equal(800)
            })
            it('Weight of 2.999kg should a cost $8', async function () {
                const mediumParcel = new MediumParcel(2999)
                expect(mediumParcel.cost).to.equal(800)
            })
            it('Weight surplus of 4.5kg should a cost $16', async function () {
                const mediumParcel = new MediumParcel(7500)
                expect(mediumParcel.cost).to.equal(1600)
            })
            it('Weight surplus of 5kg should a cost $17', async function () {
                const mediumParcel = new MediumParcel(8000)
                expect(mediumParcel.cost).to.equal(1800)
            })
        })
        describe('Large Parcel', async function () {
            it('Should return have a cost of $15', async function () {
                const largeParcel = new LargeParcel(500)
                expect(largeParcel.cost).to.equal(1500)
            })
            it('Weight of 5.999kg should a cost $15', async function () {
                const largeParcel = new LargeParcel(5999)
                expect(largeParcel.cost).to.equal(1500)
            })
            it('Weight surplus of 4.5kg should a cost $23', async function () {
                const largeParcel = new LargeParcel(10500)
                expect(largeParcel.cost).to.equal(2300)
            })
            it('Weight surplus of 5kg should a cost $25', async function () {
                const largeParcel = new LargeParcel(11000)
                expect(largeParcel.cost).to.equal(2500)
            })
        })
        describe('XL Parcel', async function () {
            it('Should return have a cost of $25', async function () {
                const xlParcel = new XLParcel(500)
                expect(xlParcel.cost).to.equal(2500)
            })
            it('Weight of 9.999kg should a cost $25', async function () {
                const xlParcel = new XLParcel(9999)
                expect(xlParcel.cost).to.equal(2500)
            })
            it('Weight surplus of 4.5kg should a cost $33', async function () {
                const xlParcel = new XLParcel(14500)
                expect(xlParcel.cost).to.equal(3300)
            })
            it('Weight surplus of 5kg should a cost $35', async function () {
                const xlParcel = new XLParcel(15000)
                expect(xlParcel.cost).to.equal(3500)
            })
        })
        describe('Heavy Parcel', async function () {
            it('Should return have a cost of $50', async function () {
                const heavyParcel = new HeavyParcel(500)
                expect(heavyParcel.cost).to.equal(5000)

            })
            it('Weight of 49.999kg should a cost $50', async function () {
                const heavyParcel = new HeavyParcel(49999)
                expect(heavyParcel.cost).to.equal(5000)

            })

            it('Weight surplus of 4.5kg should a cost $54', async function () {
                const heavyParcel = new HeavyParcel(54500)
                expect(heavyParcel.cost).to.equal(5400)

            })
            it('Weight surplus of 5kg should a cost $55', async function () {
                const heavyParcel = new HeavyParcel(55000)
                expect(heavyParcel.cost).to.equal(5500)

            })
        })

        describe('Speedy shipping', async function () {
            it('Should return have a cost equal to the items passed to it', async function () {
                const xlParcel = new XLParcel(500)
                const speedyShipping = new SpeedyShipping([xlParcel, xlParcel, xlParcel])
                expect(speedyShipping.cost).to.equal(7500)

            })
        })

        describe('Discount', async function () {
            it('Should have a cost value equal to the negative of what is passed in', async function () {
                const xlParcel = new XLParcel(500)
                const discount = new Discount(xlParcel.cost)
                expect(xlParcel.cost+discount.cost).to.equal(0)

            })
        })
    })



    describe('Items should have unique ids', async function () {
        it('different parcels should have different ids', async function () {
            const smallParcel1 = new SmallParcel(100)
            const smallParcel2 = new SmallParcel(100)
            const mediumParcel1 = new MediumParcel(100)
            const mediumParcel2 = new MediumParcel(100)
            expect(smallParcel1.id == smallParcel2.id).to.equal(false)
            expect(smallParcel1.id == mediumParcel1.id).to.equal(false)
            expect(smallParcel1.id == mediumParcel2.id).to.equal(false)
            expect(mediumParcel1.id == mediumParcel2.id).to.equal(false)
            expect(mediumParcel1.id == smallParcel2.id).to.equal(false)
            expect(smallParcel2.id == mediumParcel2.id).to.equal(false)
        })
    })

})