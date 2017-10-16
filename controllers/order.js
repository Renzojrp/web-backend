'use strict'

const Musician = require('../models/musician')
const User = require('../models/user')
const Craftman = require('../models/craftman')
const Instrument = require('../models/instrument')
const Order = require('../models/order')

function getOrder (req, res){
  let orderId = req.params.orderId

  Order.findById(orderId, (err, order) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!order) return res.status(484).send({message: `La orden no existe`})

    Instrument.populate(order, {path: "instrument"}, function(err, order){
      Craftman.populate(order, {path: "craftman"}, function(err, order){
        Musician.populate(order, {path: "instrument.musician"}, function(err, order){
          User.populate(order, {path: "instrument.musician.user"}, function(err, order){
            User.populate(order, {path: "craftman.user"}, function(err, order){
              res.send(200, { order })
            });
          });
        });
      });
    });
  })
}

function getOrders (req, res) {
  Order.find({}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(404).send({message: `No existen ordenes`})

    Instrument.populate(orders, {path: "instrument"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Musician.populate(orders, {path: "instrument.musician"}, function(err, orders){
          User.populate(orders, {path: "instrument.musician.user"}, function(err, orders){
            User.populate(orders, {path: "craftman.user"}, function(err, orders){
              res.send(200, { orders })
            });
          });
        });
      });
    });
  })
}

function getOrdersbyMusician (req, res){
  let musicianId = req.params.musicianId

  Order.find({"musician":musicianId}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(484).send({message: `No existen ordenes del músico: ${musicianId}`})

    Instrument.populate(orders, {path: "instrument"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Musician.populate(orders, {path: "instrument.musician"}, function(err, orders){
          User.populate(orders, {path: "instrument.musician.user"}, function(err, orders){
            User.populate(orders, {path: "craftman.user"}, function(err, orders){
              res.send(200, { orders })
            });
          });
        });
      });
    });
  })
}

function getOrdersbyCraftman (req, res){
  let craftmanId = req.params.craftmanId

  Order.find({"craftman":craftmanId}, (err, orders) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!orders) return res.status(484).send({message: `No existen ordenes del artesano: ${craftmanId}`})

    Instrument.populate(orders, {path: "instrument"}, function(err, orders){
      Craftman.populate(orders, {path: "craftman"}, function(err, orders){
        Musician.populate(orders, {path: "instrument.musician"}, function(err, orders){
          User.populate(orders, {path: "instrument.musician.user"}, function(err, orders){
            User.populate(orders, {path: "craftman.user"}, function(err, orders){
              res.send(200, { orders })
            });
          });
        });
      });
    });
  })
}

function saveOrder (req, res) {
  console.log('POST /api/order')
  console.log(req.body)

  let order = new Order()
  order.craftman = req.body.craftman
  order.instrument = req.body.instrument
  order.description = req.body.description
  order.locationAt = req.body.locationAt
  order.deliveryDay = req.body.deliveryDay

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
      res.status(200).send({message: `La orden se sido eliminado`})
    })
  })
}
module.exports = {
  getOrder,
  getOrders,
  getOrdersbyMusician,
  getOrdersbyCraftman,
  saveOrder,
  updateOrder,
  deleteOrder
}
