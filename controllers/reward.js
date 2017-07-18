'use strict'

const Reward = require('../models/reward')

function getReward (req, res){
  let rewardId = req.params.rewardId

  Reward.findById(rewardId, (err, reward) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!reward) return res.status(484).send({message: `La recompensa no existe`})

    res.status(200).send({ reward })
  })
}

function getRewards (req, res) {
  Reward.find({}, (err, rewards) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!rewards) return res.status(404).send({message: `No existen recompensas`})

    res.send(200, { rewards })
  })
}

function saveReward (req, res) {
  console.log('POST /api/reward')
  console.log(req.body)

  let reward = new Reward()
  reward.name = req.body.name
  reward.image = req.body.image
  reward.description = req.body.description
  reward.value = req.body.value

  reward.save((err, rewardStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({contract: rewardStored})
  })
}

function updateReward (req, res) {
  let rewardId = req.params.rewardId
  let update = req.body

  Reward.findByIdAndUpdate(rewardId, update, (err, rewardUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la recompensa ${err}`})

    res.status(200).send({ reward: rewardUpdated})
  })
}

function deleteReward (req, res) {
  let rewardId = req.params.rewardId

  Reward.findById(rewardId, (err, reward) => {
    if(err) res.status(500).send({message: `Error al borrar la recompensa ${err}`})

    reward.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la recompensa ${err}`})
      res.status(200).send({message: `La recompensa se ha sido eliminado`})
    })
  })
}
module.exports = {
  getReward,
  getRewards,
  saveReward,
  updateReward,
  deleteReward
}
