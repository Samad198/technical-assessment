import { expect } from 'chai'
import { LargeParcel, MediumParcel, SmallParcel, XLParcel } from './parcel'


describe('Different parcel types should have the correct prices', async function () {
    describe('Small Parcel', async function () {
        it('Should return have a cost of $3', async function () {
            const smallParcel = new SmallParcel()
            expect(smallParcel.cost).to.equal(300)

        })
    })
    describe('Medium Parcel', async function () {
        it('Should return have a cost of $8', async function () {
            const mediumParcel = new MediumParcel()
            expect(mediumParcel.cost).to.equal(800)

        })
    })
    describe('Large Parcel', async function () {
        it('Should return have a cost of $15', async function () {
            const largeParcel = new LargeParcel()
            expect(largeParcel.cost).to.equal(1500)

        })

    })
    describe('XL Parcel', async function () {
        it('Should return have a cost of $25', async function () {
            const xlParcel = new XLParcel()
            expect(xlParcel.cost).to.equal(2500)

        })
    })
})