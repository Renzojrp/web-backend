'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RewardSchema = new Schema({
  name: String,
  picture: String,
  description: String,
  value: Number
})

module.exports = mongoose.model('Reward', RewardSchema)
