'use strict'

const Order = require('../models/order')
const Musician = require('../models/musician')
const Craftman = require('../models/craftman')
const Publication = require('../models/publication')
const User = require('../models/user')

function getOrder (req, res){
  let orderId = req.params.orderId

  Order.findById(orderId, (err, order) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!order) return res.status(484).send({message: `La orden no existe`})

    User.populate(order, {path: "user"}, function(err, order){
      Craftman.populate(order, {path: "craftman"}, function(err, order){
        Publication.populate(order, {path: "publication"}, function(err, order){
          res.status(200).send({ order })
        });
      });
    });
  })
}

function getOrders (req, res) {
  Order.find({}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(404).send({message: `No existen ordenes`})

    User.populate(orders, {path: "user"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Publication.populate(orders, {path: "publication"}, function(err, orders){
          res.status(200).send({ orders })
        });
      });
    });
  })
}

function getOrdersbyUser (req, res){
  let userId = req.params.userId

  Order.find({"user":userId}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(484).send({message: `No existen ordenes del músico: ${publicationUser}`})

    User.populate(orders, {path: "user"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Publication.populate(orders, {path: "publication"}, function(err, orders){
          res.status(200).send({ orders })
        });
      });
    });
  })
}

function getOrdersbyCraftman (req, res){
  let craftmanId = req.params.craftmanId

  Order.find({"craftman":craftmanId}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(484).send({message: `No existen ordenes del artesano: ${publicationUser}`})

    User.populate(orders, {path: "user"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Publication.populate(orders, {path: "publication"}, function(err, orders){
          res.status(200).send({ orders })
        });
      });
    });
  })
}

function saveOrder (req, res) {
  console.log('POST /api/order')
  console.log(req.body)

  let order = new Order()
  order.user = req.body.user
  order.craftman = req.body.craftman
  order.publication = req.body.publication
  order.state = req.body.state

  order.save((err, orderStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({order: orderStored})
  })
}

function updateOrder (req, res) {
  let orderId = req.params.orderId
  let update = req.body

  Order.findByIdAndUpdate(orderId, update, (err, orderUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la orden ${err}`})

    res.status(200).send({ order: orderUpdated})
  })
}

function deleteOrder (req, res) {
  let orderId = req.params.orderId

  Order.findById(orderId, (err, order) => {
    if(err) res.status(500).send({message: `Error al borrar la orden ${err}`})

    order.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la orden ${err}`})
      res.status(200).send({message: `El contrato se ha sido eliminado`})
    })
  })
}
module.exports = {
  getOrder,
  getOrders,
  getOrdersbyUser,
  getOrdersbyCraftman,
  saveOrder,
  updateOrder,
  deleteOrder
}
