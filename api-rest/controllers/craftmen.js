'use strict'

const Craftmen = require('../models/craftmen')

function getCraftmen (req, res){
  let craftmenId = req.params.craftmenId

  Craftmen.findById(craftmenId, (err, craftmen) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftmen) return res.status(484).send({message: `El artesano no existe`})

    res.status(200).send({ craftmen })
  })
}

function getCraftmens (req, res) {
  Craftmen.find({}, (err, craftmens) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!craftmens) return res.status(404).send({message: `No existen artesanos`})

    res.send(200, { craftmens })
  })
}

function saveCraftmen (req, res) {
  console.log('POST /api/craftmen')
  console.log(req.body)

  let craftmen = new Craftmen()
  craftmen.title = req.body.title
  craftmen.image = req.body.image
  craftmen.description = req.body.description
  craftmen.confirmation = req.body.confirmation

  craftmen.save((err, craftmenStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({craftmen: craftmenStored})
  })
}

function updateCraftmen (req, res) {
  let craftmenId = req.params.craftmenId
  let update = req.body

  Craftmen.findByIdAndUpdate(craftmenId, update, (err, craftmenUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el usuario ${err}`})

    res.status(200).send({ craftmen: craftmenUpdated})
  })
}

function deleteCraftmen (req, res) {
  let craftmenId = req.params.craftmenId

  Craftmen.findById(craftmenId, (err, craftmen) => {
    if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})

    craftmen.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})
      res.status(200).send({message: `El usuario ha sido eliminado`})
    })
  })
}

module.exports = {
  getCraftmen,
  getCraftmens,
  saveCraftmen,
  updateCraftmen,
  deleteCraftmen
}
