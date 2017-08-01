'use strict'

const User = require('../models/user')
const Musician = require('../models/musician')
const Craftman = require('../models/craftman')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
    userType: req.body.userType
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    })

    if (user.userType == "Musician") {
      let musician = new Musician()
      musician.user = user._id
      musician.birthDate = ""
      musician.gender = ""
      musician.phone = ""
      musician.photo = ""

      musician.save((err, musicianStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({
          message: 'Te has registrado correctamente',
          token: service.createToken(user),
          user,
          musician: musicianStored})
      })
    } else {
      let craftman = new Craftman()
      craftman.user = user._id
      craftman.description = ""
      craftman.phone = ""
      craftman.level = ""

      craftman.save((err, craftmanStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({
          message: 'Te has registrado correctamente',
          token: service.createToken(user),
          user,
          craftmen: craftmanStored})
      })
    }
}

function signIn (req, res) {
  User.findOne({ email: req.body.email, password: req.body.password}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user),
      user
    })
  })
}

function updateUser (req, res){
  let userId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar usuario: ${err}`})

      res.status(200).send({user: userUpdated})
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!users) return res.status(404).send({message: `No existen usuarios`})

    res.send(200, { users })
  })
}

function getUser (req, res){
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!user) return res.status(484).send({message: `El usuario no existe`})

    res.status(200).send({ user })
  })
}

function deleteUser (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})

    user.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el usuario ${err}`})
      res.status(200).send({message: `El usuario ha sido eliminado`})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
