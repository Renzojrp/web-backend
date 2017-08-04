'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const PublicationSchema = Schema({
  publicationPhoto: String,
  title: String,
  instrument: String,
  description: String,
  date: { type: Date, default: Date.now() },
  locationAt: String,
  user: {type: Schema.ObjectId, ref: "User"},
  state: String
})

module.exports = mongoose.model('Publication', PublicationSchema)
