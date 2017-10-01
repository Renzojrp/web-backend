'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const contractControllers = require('../controllers/contract')
const craftmanControllers = require('../controllers/craftman')
const publicationControllers = require('../controllers/publication')
const rewardControllers = require('../controllers/reward')
const musicianControllers = require('../controllers/musician')
const orderControllers = require('../controllers/order')
const auth = require('../middlewares/auth')

const api = express.Router()

api.get('/contract', contractControllers.getContracts)
api.get('/contract/:contractId', contractControllers.getContract)
api.get('/contract/user/:userId', contractControllers.getContractbyUser)
api.post('/contract', contractControllers.saveContract)
api.put('/contract/:contractId', contractControllers.updateContract)
api.delete('/contract/:contractId', contractControllers.deleteContract)

api.get('/craftman', craftmanControllers.getCraftmen)
api.get('/craftman/:craftmanId', craftmanControllers.getCraftman)
api.get('/craftman/user/:userId', craftmanControllers.getCraftmanbyUser)
api.post('/craftman', craftmanControllers.saveCraftman)
api.put('/craftman/:craftmanId', craftmanControllers.updateCraftman)
api.delete('/craftman/:craftmanId', craftmanControllers.deleteCraftman)

api.get('/musician', musicianControllers.getMusicians)
api.get('/musician/:musicianId', musicianControllers.getMusician)
api.get('/musician/user/:userId', musicianControllers.getMusicianbyUser)
api.post('/musician', musicianControllers.saveMusician)
api.put('/musician/:musicianId', musicianControllers.updateMusician)
api.delete('/musician/:musicianId', musicianControllers.deleteMusician)

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.delete('/user/:userId', userControllers.deleteUser)
api.put('/user/:userId', userControllers.updateUser)

api.get('/publication', publicationControllers.getPublications)
api.get('/publication/:publicationId', publicationControllers.getPublication)
api.get('/publication/instrument/:publicationInstrument', publicationControllers.getPublicationbyInstrument)
api.get('/publication/user/:publicationUser', publicationControllers.getPublicationbyUser)
api.get('/publication/state/:publicationState', publicationControllers.getPublicationbyState)
api.post('/publication', publicationControllers.savePublication)
api.delete('/publication/:publicationId', publicationControllers.deletePublication)
api.put('/publication/:publicationId', publicationControllers.updatePublication)

api.get('/reward', rewardControllers.getRewards)
api.get('/reward/:rewardId', rewardControllers.getReward)
api.post('/reward', rewardControllers.saveReward)
api.delete('/reward/:rewardId', rewardControllers.deleteReward)
api.put('/reward/:rewardId', rewardControllers.updateReward)

api.get('/order', orderControllers.getOrders)
api.get('/order/:orderId', orderControllers.getOrder)
api.get('/order/user/:orderId', orderControllers.getOrdersbyUser)
api.get('/order/craftman/:orderId', orderControllers.getOrdersbyCraftman)
api.post('/order', orderControllers.saveOrder)
api.put('/order/:orderId', orderControllers.updateOrder)
api.delete('/order/:orderId', orderControllers.deleteOrder)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})
module.exports = api
