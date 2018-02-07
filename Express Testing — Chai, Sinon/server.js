const server = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const Band = require('./bands')

/* ——— Server ——— */
server.use(logger('dev'))
server.use(bodyParser.json())

/* ——— MongoDB ——— */
mongoose.connect('mongodb://localhost:27017', {}, err => {
  if (err) return console.log('——— Couldn\'t connect to the database 🙅')
  console.log('——— Connected to the database 🤖')
})
mongoose.Promise = global.Promise

/* ——— Routes ——— */
server.get('/band', async (req, res) => {
  try {
    const band = await Band.find({})

    if (!band) return res.send(err)
    res.status(200).send(band)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

server.post('/addband', async (req, res) => {
  const { name } = req.body
  try {
    const newBand = new Band({ name })
    await newBand.save()
    res.status(200).json(newBand)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

server.put('/band', async (req, res) => {
  const { id, name } = req.body
  try {
    const band = await Band.findById(id)
    band.name = name
    await band.save()
    res.status(200).send(band)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

server.delete('/band/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Band.findById(id).remove()
    res.status(200).send('Success!')
  } catch (err) {
    res.status(422).send(err.message)
  }
})

server.listen(8000, () => {
  console.log('——— Server is 👂 on port 8000')
})

module.exports = server