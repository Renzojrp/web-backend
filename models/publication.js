'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Instrument = mongoose.model('Instrument')
const Musician = mongoose.model('Musician')

const PublicationSchema = new Schema({
  instrument: {type: Schema.ObjectId, ref: "Instrument"},
  musician: {type: Schema.ObjectId, ref: "Musician"},
  description: String,
  deliveryDay: String,
  date: { type: Date, default: Date.now() },
  locationAt: String,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Publication', PublicationSchema)
