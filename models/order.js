'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Craftman = mongoose.model('Craftman')
const Instrument = mongoose.model('Instrument')

const OrderSchema = new Schema({
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  instrument: {type: Schema.ObjectId, ref: "Instrument"},
  description: String,
  deliveryDay: String,
  date: { type: Date, default: Date.now() },
  locationAt: String,
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Order', OrderSchema)
