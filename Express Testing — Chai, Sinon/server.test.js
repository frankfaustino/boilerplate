const chai = require('chai')
const { expect } = chai
const chaiHTTP = require('chai-http')

/* ——— Uncomment if MongoDB isn't running in the background ——— */
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27107')
const Band = require('./bands')
const server = require('./server')

chai.use(chaiHTTP)

describe('/band', () => {
  let bandId

  beforeEach(done => {
    new Band({ name: 'Devendra Banhart' })
      .save((err, saved) => {
        if (err) {
          console.log(err)
          return done()
        }
        bandId = saved.id
        done()
      })
  })

  afterEach(done => {
    Band.remove({}, err => {
      if (err) console.log(err)
      done()
    })
  })

  describe('[GET] /band' , () => {
    it('should get all da bandz', done => {
      chai.request(server)
        .get('/band')
        .end((err, res) => {
          if (err) return console.log(err)
          expect(res.status).to.equal(200)
          expect(Array.isArray(res.body)).to.equal(true)
          expect(res.body.length).to.not.equal(0)
          done()
        })
    })
  })

  describe('[POST] /addband', () => {
    it('should add a new band', done => {
      const band = { name: 'LCD Soundsystem' }
      // let id

      chai.request(server)
        .post('/addband')
        .send(band)
        .end((err, res) => {
          if (err) return console.log(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('LCD Soundsystem')
          done()
        })
    })
  })

  describe('[PUT] /band', () => {
    it('should update band infoz', done => {
      const update = {
        id: bandId,
        name: 'Phoenix'
      }

      chai.request(server)
        .put('/band')
        .send(update)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.name).to.equal('Phoenix')
          done()
        })
    })
  })

  describe('[DELETE], /band/:id', () => {
    it('should delete band from database', done => {
      chai.request(server)
        .delete(`/band/${bandId}`)
        .end((err, res) => {
          if (err) {
            console.log(err)
            return done()
          }
          expect(res.text).to.equal('Success!')
          Band.findById(bandId, (err, deleted) => {
            if (err) {
              console.log(err)
              return done()
            }
            expect(deleted).to.equal(null)
            done()
          })
        })
    })
  })
})