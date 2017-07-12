'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const User = mongoose.model('User')

const PublicationSchema = Schema({
  instrument: String,
  description: String,
  date: Date,
  locationAt: String,
  craftmen: {type: Schema.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Publication', PublicationSchema)
