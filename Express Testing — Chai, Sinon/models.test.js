const chai = require('chai')
const { expect } = chai
const sinon = require('sinon')

/* ——— Uncomment if MongoDB isn't running in the background ——— */
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017')
const Band = require('./bands')

describe('Band', () => {
  const band = new Band({ name: 'My Bloody Valentine' })
  describe('getName()', () => {
    it('should return the name of the band', done => {
      expect(band.getName()).to.equal('My Bloody Valentine')
      done()
    })
    it('should return a String', done => {
      expect(typeof band.getName()).to.equal('string')
      done()
    })
  })

  describe('getAllBands()', () => {
    it('should return all da bandz', done => {
      /* ——— Stubs replace the target function with stub ——— */
      /* –—— 1) Stubs can be used to replace problematic code ——— */
      /* ——— 2) Trigger code paths that are otherwise unreachable (error handling) ——— */
      /* ——— 3) Can use then to test asynchronous code more easily ——— */

      /* ——— sinon.stub here replaces the find method inside your getAllBands statics ——— */
      sinon.stub(Band, 'find')

      /* ——— yields calls the *stubbed* find function with arguments provided ——— */
      /* ——— essentially it's saying *stubbed* find found the following items ——— */
      Band.find.yields(null, [{ name: 'LCD Soundsystem' }])

      Band.getAllBands((bands) => {
        /* ——— then we test our getAllBands statics with the *stubbed* find function ——— */
        expect(bands.length).to.equal(1)
        expect(bands[0].name).to.equal('LCD Soundsystem')
        /* ——— restore functionality to the find function ——— */
        Band.find.restore()
        done()
      })
    })
  })
})