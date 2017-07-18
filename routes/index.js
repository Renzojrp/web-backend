'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const contractControllers = require('../controllers/contract')
const craftmenControllers = require('../controllers/craftmen')
const publicationControllers = require('../controllers/publication')
const rewardControllers = require('../controllers/reward')
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
api.get('/user/:userId', userControllers.getUser)

api.get('/publication', publicationControllers.getPublications)
api.get('/publication/:publicationId', publicationControllers.getPublication)
api.post('/publication', publicationControllers.savePublication)
api.delete('/publication/:publicationId', publicationControllers.deletePublication)
api.put('/publication/:publicationId', publicationControllers.updatePublication)

api.get('/reward', rewardControllers.getRewards)
api.get('/reward/:rewardId', rewardControllers.getReward)
api.post('/reward', rewardControllers.saveReward)
api.delete('/reward/:rewardId', rewardControllers.deleteReward)
api.put('/reward/:rewardId', rewardControllers.updateReward)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})
module.exports = api
