'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const CraftmenSchema = Schema({
  name: String,
  description: String,
  phone: String,
  level: String,
})

module.exports = mongoose.model('Craftmen', CraftmenSchema)
