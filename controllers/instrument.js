'use strict'

const Musician = require('../models/musician')
const User = require('../models/user')
const Instrument = require('../models/instrument')

function getInstrument (req, res) {
  let instrumentId = req.params.instrumentId

  Instrument.findById(instrumentId, (err, instrument) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!instrument) return res.status(404).send({message: `Error el instrumento no existe`})

    Musician.populate(instrument, {path: "musician"}, function(err, instrument){
      User.populate(instrument, {path: "musician.user"}, function(err, instrument){
        res.status(200).send({ instrument })
      });
    });
  })
}

function getInstruments (req, res) {
  Instrument.find({}, (err, instruments) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!instruments) return res.status(404).send({message: `No existen instrumentos`})

    Musician.populate(instruments, {path: "musician"}, function(err, instruments){
      User.populate(instruments, {path: "musician.user"}, function(err, instruments){
        res.status(200).send({ instruments })
      });
    });
  })
}

function getInstrumentbyMusician (req, res) {
  let musicianId = req.params.musicianId

  Instrument.find({"musician":musicianId}, (err, instruments) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!instruments) return res.status(404).send({message: `No existen instrumentos`})

    Musician.populate(instruments, {path: "musician"}, function(err, instruments){
      User.populate(instruments, {path: "musician.user"}, function(err, instruments){
        res.status(200).send({ instruments })
      });
    });
  })
}

function saveInstrument (req, res) {
  console.log('POST /api/instrument')
  console.log(req.body)

  let instrument = new Instrument()
  instrument.musician = req.body.musician
  instrument.instrument = req.body.instrument
  instrument.brand = req.body.brand
  instrument.model = req.body.model
  instrument.picture = req.body.picture
  instrument.serialNumber = req.body.serialNumber

  instrument.save((err, instrumentStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({instrument: instrumentStored})
  })
}

function updateInstrument (req, res) {
  let instrumentId = req.params.instrumentId
  let update = req.body

  Instrument.findByIdAndUpdate(instrumentId, update, (err, instrumentUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el instrumento: ${err}`})

    res.status(200).send({ instrument: instrumentUpdated})
  })
}

function deleteInstrument (req, res) {
  let instrumentId = req.params.instrumentId

  Instrument.findById(instrumentId, (err, instrument) => {
    if(err) res.status(500).send({message: `Error al borrar el instrumento: ${err}`})

    instrument.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el instrumento: ${err}`})
      res.status(200).send({message: `El instrumento ha sido eliminado`})
    })
  })
}

module.exports = {
  getInstrument,
  getInstruments,
  getInstrumentbyMusician,
  saveInstrument,
  updateInstrument,
  deleteInstrument
}
