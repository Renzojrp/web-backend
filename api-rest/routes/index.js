'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const contractControllers = require('../controllers/contract')
const craftmenControllers = require('../controllers/craftmen')

const api = express.Router()

api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.post('/user', userControllers.saveUser)
api.put('/user/:userId', userControllers.updateUser)
api.delete('/user/:userId', userControllers.deleteUser)
api.get('/contract', contractControllers.getContracts)
api.get('/contract/:contractId', contractControllers.getContract)
api.post('/contract', contractControllers.saveContract)
api.put('/contract/:contractId', contractControllers.updateContract)
api.delete('/contract/:contractId', contractControllers.deleteContract)
api.get('/craftmen', craftmenControllers.getCraftmens)
api.get('/craftmen/:craftmenId', craftmenControllers.getCraftmen)
api.post('/craftmen', craftmenControllers.saveCraftmen)
api.put('/craftmen/:craftmenId', craftmenControllers.updateCraftmen)
api.delete('/craftmen/:craftmenId', craftmenControllers.deleteCraftmen)
module.exports = api
