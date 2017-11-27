'use strict'

const express = require('express')
const userControllers = require('../controllers/user')
const craftmanControllers = require('../controllers/craftman')
const publicationControllers = require('../controllers/publication')
const rewardControllers = require('../controllers/reward')
const musicianControllers = require('../controllers/musician')
const orderControllers = require('../controllers/order')
const instrumentControllers = require('../controllers/instrument')
const budgetControllers = require('../controllers/budget')
const contractControllers = require('../controllers/contract')
const auth = require('../middlewares/auth')

const api = express.Router()

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.get('/user/email/:email', userControllers.getUserByEmail)
api.delete('/user/:userId', auth, userControllers.deleteUser)
api.put('/user/:userId', auth, userControllers.updateUser)

api.get('/musician', auth, musicianControllers.getMusicians)
api.get('/musician/:musicianId', auth, musicianControllers.getMusician)
api.get('/musician/user/:userId', auth, musicianControllers.getMusicianbyUser)
api.post('/musician', auth, musicianControllers.saveMusician)
api.put('/musician/:musicianId', auth, musicianControllers.updateMusician)
api.delete('/musician/:musicianId', auth, musicianControllers.deleteMusician)

api.get('/craftman', auth, craftmanControllers.getCraftmen)
api.get('/craftman/:craftmanId', auth, craftmanControllers.getCraftman)
api.get('/craftman/user/:userId', auth, craftmanControllers.getCraftmanbyUser)
api.post('/craftman', auth, craftmanControllers.saveCraftman)
api.put('/craftman/:craftmanId', auth, craftmanControllers.updateCraftman)
api.delete('/craftman/:craftmanId', auth, craftmanControllers.deleteCraftman)

api.get('/reward', rewardControllers.getRewards)
api.get('/reward/:rewardId', rewardControllers.getReward)
api.post('/reward', auth, rewardControllers.saveReward)
api.delete('/reward/:rewardId', auth, rewardControllers.deleteReward)
api.put('/reward/:rewardId', auth, rewardControllers.updateReward)

api.get('/instrument', auth, instrumentControllers.getInstruments)
api.get('/instrument/:instrumentId', auth, instrumentControllers.getInstrument)
api.get('/instrument/musician/:musicianId', auth, instrumentControllers.getInstrumentbyMusician)
api.post('/instrument', auth, instrumentControllers.saveInstrument)
api.delete('/instrument/:instrumentId', auth, instrumentControllers.deleteInstrument)
api.put('/instrument/:instrumentId', auth, instrumentControllers.updateInstrument)

api.get('/publication', auth, publicationControllers.getPublications)
api.get('/publication/:publicationId', auth, publicationControllers.getPublication)
api.get('/publication/instrument/:instrumentId', auth, publicationControllers.getPublicationbyInstrument)
api.get('/publication/musician/:musicianId', auth, publicationControllers.getPublicationbyMusician)
api.get('/publication/status/:status', auth, publicationControllers.getPublicationbyStatus)
api.post('/publication', auth, publicationControllers.savePublication)
api.delete('/publication/:publicationId', auth, publicationControllers.deletePublication)
api.put('/publication/:publicationId', auth, publicationControllers.updatePublication)

api.get('/order', auth, orderControllers.getOrders)
api.get('/order/:orderId', auth, orderControllers.getOrder)
api.get('/order/musician/:musicianId', auth, orderControllers.getOrdersbyMusician)
api.get('/order/craftman/:craftmanId', auth, orderControllers.getOrdersbyCraftman)
api.get('/order/instrument/:instrumentId', auth, orderControllers.getOrdersbyInstrument)
api.post('/order', auth, orderControllers.saveOrder)
api.put('/order/:orderId', auth, orderControllers.updateOrder)
api.delete('/order/:orderId', auth, orderControllers.deleteOrder)

api.get('/budget', auth, budgetControllers.getBudgets)
api.get('/budget/:budgetId', auth, budgetControllers.getBudget)
api.get('/budget/publication/:publicationId', auth, budgetControllers.getBudgetByPublication)
api.get('/budget/status/:status', auth, budgetControllers.getBudgetbyStatus)
api.post('/budget', auth, budgetControllers.saveBudget)
api.delete('/budget/:budgetId', auth, budgetControllers.deleteBudget)
api.put('/budget/:budgetId', auth, budgetControllers.updateBudget)

api.get('/contract', auth, contractControllers.getContracts)
api.get('/contract/:contractId', auth, contractControllers.getContract)
api.get('/contract/musician/:musicianId', auth, contractControllers.getContractByMusician)
api.get('/contract/craftman/:craftmanId', auth, contractControllers.getContractByCraftman)
api.post('/contract', auth, contractControllers.saveContract)
api.delete('/contract/:contractId', auth, contractControllers.deleteContract)
api.put('/contract/:contractId', auth, contractControllers.updateContract)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

api.get('/open', (req, res) => {
  res.status(200).send({ message: 'No es necesario estar logueado para ver esta pagina' })
})

module.exports = api
