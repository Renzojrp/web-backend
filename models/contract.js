'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Musician = mongoose.model('Musician')
const Craftman = mongoose.model('Craftman')
//const Publication = mongoose.model('Publication')

const ContractSchema = Schema({
  musician: {type: Schema.ObjectId, ref: "Musician"},
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  publication: {type: Schema.ObjectId, ref: "Publication"},
  state: String,
  date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Contract', ContractSchema)
