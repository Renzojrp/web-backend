'use strict'

const Musician = require('../models/musician')
const User = require('../models/user')
const Instrument = require('../models/instrument')
const Publication = require('../models/publication')

function getPublication (req, res){
  let publicationId = req.params.publicationId

  Publication.findById(publicationId, (err, publication) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publication) return res.status(484).send({message: `La publicación no existe`})

    Instrument.populate(publications, {path: "instrument"}, function(err, publications){
      Musician.populate(publications, {path: "instrument.musician"}, function(err, publications){
        Musician.populate(publications, {path: "musician"}, function(err, publications){
          User.populate(publications, {path: "instrument.musician.user"}, function(err, publications){
            res.send(200, { publications })
          });
        });
      });
    });

  })
}

function getPublications (req, res) {
  Publication.find({}, function(err,publications){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(404).send({message: `No existen publicaciones`})

    Instrument.populate(publications, {path: "instrument"}, function(err, publications){
      Musician.populate(publications, {path: "instrument.musician"}, function(err, publications){
        Musician.populate(publications, {path: "musician"}, function(err, publications){
          User.populate(publications, {path: "instrument.musician.user"}, function(err, publications){
            res.send(200, { publications })
          });
        });
      });
    });
  });
}

function getPublicationbyInstrument (req, res){
  let instrument = req.params.instrument

  Publication.find({"instrument.instrument":instrument}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones con el instrument: ${instrument}`})

    Instrument.populate(publications, {path: "instrument"}, function(err, publications){
      Musician.populate(publications, {path: "instrument.musician"}, function(err, publications){
        Musician.populate(publications, {path: "musician"}, function(err, publications){
          User.populate(publications, {path: "instrument.musician.user"}, function(err, publications){
            res.send(200, { publications })
          });
        });
      });
    });
  })
}

function getPublicationbyMusician (req, res){
  let musicianId = req.params.musicianId

  Publication.find({"musician": musicianId, "status": "A"}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones del artesano: ${musicianId}`})

    Instrument.populate(publications, {path: "instrument"}, function(err, publications){
      Musician.populate(publications, {path: "instrument.musician"}, function(err, publications){
        Musician.populate(publications, {path: "musician"}, function(err, publications){
          User.populate(publications, {path: "instrument.musician.user"}, function(err, publications){
            res.send(200, { publications })
          });
        });
      });
    });
  })
}

function getPublicationbyStatus (req, res){
  let status = req.params.status

  Publication.find({"state":status}, (err, publications) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!publications) return res.status(484).send({message: `No existen publicaciones en estado: ${status}`})

    Instrument.populate(publications, {path: "instrument"}, function(err, publications){
      Musician.populate(publications, {path: "instrument.musician"}, function(err, publications){
        User.populate(publications, {path: "instrument.musician.user"}, function(err, publications){
          res.send(200, { publications })
        });
      });
    });
  })
}

function savePublication (req, res) {
  console.log('POST /api/publication')
  console.log(req.body)

  let publication = new Publication()
  publication.instrument = req.body.instrument
  publication.description = req.body.description
  publication.locationAt = req.body.locationAt
  publication.deliveryDay = req.body.deliveryDay

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
  getPublicationbyMusician,
  getPublicationbyStatus,
  savePublication,
  updatePublication,
  deletePublication
}
