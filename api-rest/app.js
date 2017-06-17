'use strict'

const express = require('express')
const boyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(boyParser.urlencoded({extended: false}))
app.use(boyParser.json())

app.use('/api', api)

module.exports = app
