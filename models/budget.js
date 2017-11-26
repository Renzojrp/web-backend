'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Publication = mongoose.model('Publication')
const Musician = mongoose.model('Musician')
const Craftman = mongoose.model('Craftman')

const BudgetSchema = new Schema({
  publication: {type: Schema.ObjectId, ref: "Publication"},
  musician: {type: Schema.ObjectId, ref: "Musician"},
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  price: Number,
  date: { type: Date, default: Date.now() },
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Budget', BudgetSchema)
