'use strict'

const User = require('../models/user')
const Musician = require('../models/musician')

function getMusician (req, res){
  let musicianId = req.params.musicianId

  Musician.findById(musicianId, (err, musician) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!musician) return res.status(484).send({message: `El músico no existe`})

    User.populate(musician, {path: "user"}, function(err, musician){
      res.status(200).send({ musician })
    });
  })
}

function getMusicians (req, res) {
  Musician.find({}, (err, musicians) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!musicians) return res.status(404).send({message: `No existen musicos`})

    User.populate(musicians, {path: "user"}, function(err, musicians){
      res.send(200, { musicians })
    });
  })
}

function getMusicianbyUser (req, res){
  let userId = req.params.userId

  Musician.findOne({"user":userId}, (err, musician) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!musician) return res.status(484).send({message: `No existen perfil de músico para el usuario: ${userId}`})

    User.populate(musician, {path: "user"}, function(err, musician){
      res.status(200).send({ musician })
    });
  })
}

function saveMusician (req, res) {
  console.log('POST /api/musician')
  console.log(req.body)

  let musician = new Musician()
  musician.user = req.body.user
  musician.points = req.body.points

  musician.save((err, userStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({musician: musicianStored})
  })
}

function updateMusician (req, res) {
  let musicianId = req.params.musicianId
  let update = req.body

  Musician.findByIdAndUpdate(musicianId, update, (err, musicianUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el músico ${err}`})

    res.status(200).send({ musician: musicianUpdated})
  })
}

function deleteMusician (req, res) {
  let musicianId = req.params.musicianId

  Musician.findById(musicianId, (err, musician) => {
    if(err) res.status(500).send({message: `Error al borrar el músico ${err}`})

    musician.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el músico ${err}`})
      res.status(200).send({message: `El músico ha sido eliminado`})
    })
  })
}

module.exports = {
  getMusician,
  getMusicians,
  getMusicianbyUser,
  saveMusician,
  updateMusician,
  deleteMusician
}
