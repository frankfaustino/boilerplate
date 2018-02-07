const mongoose = require('mongoose')
const { Schema } = mongoose

const BandSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: false
  }
})

BandSchema.methods.getName = function() {
  return this.name
}

BandSchema.statics.getAllBands = function(cb) {
  /* ——— Async/Await doesn't work ——— */
  // try {
  //   const band = await Band.find({})
  //   if (!band) return cb(err)
  //   cb(band)
  // } catch (err) {
  //   cb(err)
  // }
  Band.find({}, (err, band) => {
    if (err) return cb(err);
    cb(band);
  });
}

const Band = mongoose.model('Band', BandSchema)

module.exports = Band