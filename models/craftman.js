'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CraftmanSchema = Schema({
  name: String,
  description: String,
  phone: String,
  level: String,
})

module.exports = mongoose.model('Craftman', CraftmanSchema)
