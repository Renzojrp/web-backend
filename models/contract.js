'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Instrument = mongoose.model('Instrument')
const Musician = mongoose.model('Musician')
const Craftman = mongoose.model('Craftman')

const ContractSchema = new Schema({
  musician: {type: Schema.ObjectId, ref: "Musician"},
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  price: Number,
  date: { type: Date, default: Date.now() },
  status: { type: String, default: "A" },
  type: String,
  instrument: {type: Schema.ObjectId, ref: "Instrument"},
  description: String,
})

module.exports = mongoose.model('Contract', ContractSchema)
