'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const MusicianSchema = Schema({
  birthDate: String,
  gender: String,
  phone: String,
  photo: String,
  points: Number,
  user: {type: Schema.ObjectId, ref: "User"}
})

module.exports = mongoose.model('Musician', MusicianSchema)
