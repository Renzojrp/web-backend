'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RewardSchema = Schema({
  name: String,
  image: String,
  description: String,
  value: Number,
})

module.exports = mongoose.model('Reward', RewardSchema)
