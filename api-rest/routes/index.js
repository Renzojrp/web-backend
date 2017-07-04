'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const contractControllers = require('../controllers/contract')
const craftmenControllers = require('../controllers/craftmen')
const publicationControllers = require('../controllers/publication')
const auth = require('../middlewares/auth')

const api = express.Router()

api.get('/contract', contractControllers.getContracts)
api.get('/contract/:contractId', contractControllers.getContract)
api.post('/contract', contractControllers.saveContract)
api.put('/contract/:contractId', contractControllers.updateContract)
api.delete('/contract/:contractId', contractControllers.deleteContract)
api.get('/craftmen', craftmenControllers.getCraftman)
api.get('/craftmen/:craftmenId', craftmenControllers.getCraftmen)
api.post('/craftmen', craftmenControllers.saveCraftmen)
api.put('/craftmen/:craftmenId', craftmenControllers.updateCraftmen)
api.delete('/craftmen/:craftmenId', craftmenControllers.deleteCraftmen)
api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/publication', auth, publicationControllers.getPublications)
api.post('/publication', auth, publicationControllers.savePublication)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})
module.exports = api
