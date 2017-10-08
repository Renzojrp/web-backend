'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const MusicianSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  points: { type: Number, default: 0 }
})

module.exports = mongoose.model('Musician', MusicianSchema)
