'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = Schema({
  name: String,
  email: { type:String, unique:true, lowercase:true },
  password: {type: String, select: false}
})

module.exports = mongoose.model('User', UserSchema)
