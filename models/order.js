'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Musician = mongoose.model('Musician')
const Craftman = mongoose.model('Craftman')
const User = mongoose.model('User')

const OrderSchema = Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  craftman: {type: Schema.ObjectId, ref: "Craftman"},
  publication: {type: Schema.ObjectId, ref: "Publication"},
  state: String
})

module.exports = mongoose.model('Order', OrderSchema)
