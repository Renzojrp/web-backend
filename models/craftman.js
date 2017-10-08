'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = mongoose.model('User')

const CraftmanSchema = new Schema({
  user: {type: Schema.ObjectId, ref: "User"},
  description: { type: String, default: "" },
  qualification: { type: Number, default: 0 }
})

module.exports = mongoose.model('Craftman', CraftmanSchema)
