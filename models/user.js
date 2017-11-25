'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  password: { type: String, select: false },
  userType: String,
  signupDate: { type: Date, default: Date.now() },
  birthDate: { type: String, default: "" },
  gender: { type: String, default: "" },
  phone: { type: String, default: "" },
  photo: { type: String, default: "" }
})

module.exports = mongoose.model('User', UserSchema)
