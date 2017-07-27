'use strict'

const Craftman = require('../models/craftman')

function getCraftman (req, res){
  let craftmanId = req.params.craftmanId

  Craftman.findById(craftmanId, (err, craftman) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftman) return res.status(484).send({message: `El artesano no existe`})

    res.status(200).send({ craftman })
  })
}

function getCraftmen (req, res) {
  Craftman.find({}, (err, craftmen) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftmen) return res.status(404).send({message: `No existen artesanos`})

    res.send(200, { craftmen })
  })
}

function saveCraftman (req, res) {
  console.log('POST /api/craftman')
  console.log(req.body)

  let craftman = new Craftman()
  craftman.name = req.body.name
  craftman.description = req.body.description
  craftman.phone = req.body.phone
  craftman.level = req.body.level

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
  updateCraftman,
  deleteCraftman
}
