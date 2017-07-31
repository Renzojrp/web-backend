'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const CraftmanSchema = Schema({
  description: String,
  phone: String,
  level: String,
  user: {type: Schema.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Craftman', CraftmanSchema)
