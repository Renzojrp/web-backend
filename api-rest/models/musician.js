'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MusicianSchema = Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  gender: String,
  phone: String,
  photo: String
})

module.exports = mongoose.model('Musician', UserSchema)

