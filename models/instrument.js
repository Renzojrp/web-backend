'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Musician = mongoose.model('Musician')

const InstrumentSchema = new Schema({
  musician: {type: Schema.ObjectId, ref: "Musician"},
  instrument: String,
  brand: String,
  model: String,
  picture: String,
  serialNumber: { type: String, default: "" },
  status: { type: String, default: "A"}
})

module.exports = mongoose.model('Instrument', InstrumentSchema)
