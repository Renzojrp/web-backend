'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const ContractSchema = Schema({
  tittle: String,
  image: String,
  description: String,
  confirmation: Boolean,
})

module.exports = mongoose.model('Contract', ContractSchema)
