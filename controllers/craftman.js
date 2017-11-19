'use strict'

const User = require('../models/user')
const Craftman = require('../models/craftman')

function getCraftman (req, res){
  let craftmanId = req.params.craftmanId

  Craftman.findById(craftmanId, (err, craftman) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftman) return res.status(484).send({message: `El artesano no existe`})

    User.populate(craftman, {path: "user"}, function(err, craftman){
      res.status(200).send({ craftman })
    });
  })
}

function getCraftmen (req, res) {
  Craftman.find({}, (err, craftmen) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftmen) return res.status(404).send({message: `No existen artesanos`})

    User.populate(craftmen, {path: "user"}, function(err, craftmen){
      res.send(200, { craftmen })
    });
  })
}

function getCraftmanbyUser (req, res){
  let userId = req.params.userId

  Craftman.findOne({"user":userId}, (err, craftman) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftman) return res.status(484).send({message: `No existen perfil de artesano para el artesano: ${userId}`})

    User.populate(craftman, {path: "user"}, function(err, craftman){
      res.send(200, { craftman })
    });
  })
}

function saveCraftman (req, res) {
  console.log('POST /api/craftman')
  console.log(req.body)

  let craftman = new Craftman()
  craftman.user = req.body.user
  craftman.description = req.body.description
  craftman.qualification = req.body.qualification

  craftman.save((err, craftmanStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({craftmen: craftmanStored})
  })
}

function updateCraftman (req, res) {
  let craftmanId = req.params.craftmanId
  let update = req.body

  Craftman.findByIdAndUpdate(craftmanId, update, (err, craftmanUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el usuario ${err}`})

    res.status(200).send({ craftman: craftmanUpdated})
  })
}

function deleteCraftman (req, res) {
  let craftmanId = req.params.craftmanId

  Craftman.findById(craftmanId, (err, craftman) => {
    if(err) res.status(500).send({message: `Error al borrar el artesano ${err}`})

    craftman.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el artesano ${err}`})
      res.status(200).send({message: `El artesano ha sido eliminado`})
    })
  })
}

module.exports = {
  getCraftman,
  getCraftmen,
  saveCraftman,
  getCraftmanbyUser,
  updateCraftman,
  deleteCraftman
}
