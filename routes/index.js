'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const craftmanControllers = require('../controllers/craftman')
const publicationControllers = require('../controllers/publication')
const rewardControllers = require('../controllers/reward')
const musicianControllers = require('../controllers/musician')
const orderControllers = require('../controllers/order')
const instrumentControllers = require('../controllers/instrument')
const auth = require('../middlewares/auth')

const api = express.Router()

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.delete('/user/:userId', userControllers.deleteUser)
api.put('/user/:userId', userControllers.updateUser)

api.get('/musician', musicianControllers.getMusicians)
api.get('/musician/:musicianId', musicianControllers.getMusician)
api.get('/musician/user/:userId', musicianControllers.getMusicianbyUser)
api.post('/musician', musicianControllers.saveMusician)
api.put('/musician/:musicianId', musicianControllers.updateMusician)
api.delete('/musician/:musicianId', musicianControllers.deleteMusician)

api.get('/craftman', craftmanControllers.getCraftmen)
api.get('/craftman/:craftmanId', craftmanControllers.getCraftman)
api.get('/craftman/user/:userId', craftmanControllers.getCraftmanbyUser)
api.post('/craftman', craftmanControllers.saveCraftman)
api.put('/craftman/:craftmanId', craftmanControllers.updateCraftman)
api.delete('/craftman/:craftmanId', craftmanControllers.deleteCraftman)

api.get('/reward', rewardControllers.getRewards)
api.get('/reward/:rewardId', rewardControllers.getReward)
api.post('/reward', rewardControllers.saveReward)
api.delete('/reward/:rewardId', rewardControllers.deleteReward)
api.put('/reward/:rewardId', rewardControllers.updateReward)

api.get('/instrument', instrumentControllers.getInstruments)
api.get('/instrument/:instrumentId', instrumentControllers.getInstrument)
api.get('/instrument/musician/:musicianId', auth, instrumentControllers.getInstrumentbyMusician)
api.post('/instrument', instrumentControllers.saveInstrument)
api.delete('/instrument/:instrumentId', instrumentControllers.deleteInstrument)
api.put('/instrument/:instrumentId', instrumentControllers.updateInstrument)

api.get('/publication', publicationControllers.getPublications)
api.get('/publication/:publicationId', publicationControllers.getPublication)
api.get('/publication/instrument/:instrument', publicationControllers.getPublicationbyInstrument)
api.get('/publication/musician/:musicianId', publicationControllers.getPublicationbyMusician)
api.get('/publication/status/:status', publicationControllers.getPublicationbyStatus)
api.post('/publication', publicationControllers.savePublication)
api.delete('/publication/:publicationId', publicationControllers.deletePublication)
api.put('/publication/:publicationId', publicationControllers.updatePublication)

api.get('/order', orderControllers.getOrders)
api.get('/order/:orderId', orderControllers.getOrder)
api.get('/order/musician/:musicianId', orderControllers.getOrdersbyMusician)
api.get('/order/craftman/:craftmanId', orderControllers.getOrdersbyCraftman)
api.post('/order', orderControllers.saveOrder)
api.put('/order/:orderId', orderControllers.updateOrder)
api.delete('/order/:orderId', orderControllers.deleteOrder)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
