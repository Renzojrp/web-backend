'use strict'

const Musician = require('../models/musician')

function getMusician (req, res){
  let musicianId = req.params.musicianId

  Musician.findById(musicianId, (err, musician) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!musician) return res.status(484).send({message: `El músico no existe`})

    res.status(200).send({ musician })
  })
}

function getMusicians (req, res) {
  Musician.find({}, (err, musicians) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!users) return res.status(404).send({message: `No existen musicos`})

    res.send(200, { musicians })
  })
}

function saveMusician (req, res) {
  console.log('POST /api/musician')
  console.log(req.body)

  let musician = new Musician()
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.birthDate = req.body.birthDate
  user.gender=req.body.gender
  user.phone=req.body.phone
  user.photo=req.body.photo

  musician.save((err, userStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({musician: musicianStored})
  })
}

function updateMusician (req, res) {
  let musicianId = req.params.musicianId
  let update = req.body

  Musician.findByIdAndUpdate(musicianId, update, (err, musicianUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el musico ${err}`})

    res.status(200).send({ musician: musicianUpdated})
  })
}

function deleteMusician (req, res) {
  let musicianId = req.params.musicianId

  Musician.findById(musicianId, (err, user) => {
    if(err) res.status(500).send({message: `Error al borrar el musico ${err}`})

    musician.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el musico ${err}`})
      res.status(200).send({message: `El musico ha sido eliminado`})
    })
  })
}

module.exports = {
  getMusician,
  getMusicians,
  saveMusician,
  updateMusician,
  deleteMusician
}
