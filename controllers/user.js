'use strict'

const User = require('../models/user')
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

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.findOne({ email: req.body.email, password: req.body.password}, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
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

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser
}
