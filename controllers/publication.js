'use strict'

const Publication = require('../models/publication')
const User = require('../models/user')

function getPublication (req, res){
  let publicationId = req.params.publicationId

  Publication.findById(publicationId, (err, publication) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publication) return res.status(484).send({message: `La publicación no existe`})

    res.status(200).send({ publication })
  })
}

function getPublications (req, res) {
  Publication.find({}, function(err,publications){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(404).send({message: `No existen publicaciones`})

    User.populate(publications, {path: "craftmen"}, function(err, publications){
      res.send(200, { publications })
    });
  });
}

function getPublicationbyInstrument (req, res){
  let publicationInstrument = req.params.publicationInstrument

  Publication.find({"instrument":publicationInstrument}, (err, publication) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publication) return res.status(484).send({message: `No existen publicaciones con el instrument: ${publicationInstrument}`})

    res.status(200).send({ publication })
  })
}

function getPublicationbyCraftmen (req, res){
  let publicationCraftmen = req.params.publicationCraftmen

  Publication.find({"craftmen":publicationCraftmen}, (err, publication) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publication) return res.status(484).send({message: `No existen publicaciones del artesano: ${publicationInstrument}`})

    res.status(200).send({ publication })
  })
}

function savePublication (req, res) {
  console.log('POST /api/publication')
  console.log(req.body)

  let publication = new Publication()
  publication.instrument = req.body.instrument
  publication.description = req.body.description
  publication.locationAt = req.body.locationAt
  publication.craftmen = req.body.craftmen

  publication.save((err, publicationStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({publication: publicationStored})
  })
}

function updatePublication (req, res) {
  let publicationId = req.params.publicationId
  let update = req.body

  Publication.findByIdAndUpdate(publicationId, update, (err, publicationUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la publicación ${err}`})

    res.status(200).send({ publication: publicationUpdated})
  })
}

function deletePublication (req, res) {
  let publicationId = req.params.publicationId

  Publication.findById(publicationId, (err, publication) => {
    if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})

    publication.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la publicación ${err}`})
      res.status(200).send({message: `La publicación ha sido eliminado`})
    })
  })
}

module.exports = {
  getPublication,
  getPublications,
  getPublicationbyInstrument,
  getPublicationbyCraftmen,
  savePublication,
  updatePublication,
  deletePublication
}
