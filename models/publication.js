'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const PublicationSchema = Schema({
  instrument: String,
  description: String,
  date: { type: Date, default: Date.now() },
  locationAt: String,
  craftmen: {type: Schema.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Publication', PublicationSchema)
