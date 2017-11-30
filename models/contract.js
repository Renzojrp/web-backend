'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Publication = mongoose.model('Publication')
const Order = mongoose.model('Order')
const Musician = mongoose.model('Musician')
const Craftman = mongoose.model('Craftman')

const ContractSchema = new Schema({
  publication: {type: Schema.ObjectId, ref: "Publication"},
  order: {type: Schema.ObjectId, ref: "Order"},
  musician: {type: Schema.ObjectId, ref: "Musician"},
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  price: Number,
  date: { type: Date, default: Date.now() },
  status: { type: String, default: "A" }
  type: String,
})

module.exports = mongoose.model('Contract', ContractSchema)
