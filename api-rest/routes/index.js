'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const api = express.Router()

api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.post('/user', userControllers.saveUser)
api.put('/user/:userId', userControllers.updateUser)
api.delete('/user/:userId', userControllers.deleteUser)

module.exports = api
