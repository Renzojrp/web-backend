'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Instrument = mongoose.model('Instrument')

const PublicationSchema = new Schema({
  instrument: {type: Schema.ObjectId, ref: "Instrument"},
  description: String,
  deliveryDay: String,
  date: { type: Date, default: Date.now() },
  locationAt: String,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Publication', PublicationSchema)
