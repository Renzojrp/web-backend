'use strict'

const Contract = require('../models/contract')

function getContract (req, res){
  let contractId = req.params.contractId

  Contract.findById(contractId, (err, contract) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contract) return res.status(484).send({message: `El contrato no existe`})

    res.status(200).send({ contract })
  })
}

function getContracts (req, res) {
  Contract.find({}, (err, contracts) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(404).send({message: `No existen contratos`})

    res.send(200, { contracts })
  })
}

function saveContract (req, res) {
  console.log('POST /api/contract')
  console.log(req.body)

  let contract = new Contract()
  contract.tittle = req.body.tittle
  contract.image = req.body.image
  contract.description = req.body.description
  contract.confirmation = req.body.confirmation

  contract.save((err, contractStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({contract: contractStored})
  })
}

function updateContract (req, res) {
  let contractId = req.params.contractId
  let update = req.body

  Contract.findByIdAndUpdate(contractId, update, (err, contractUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el contrato ${err}`})

    res.status(200).send({ contract: contractUpdated})
  })
}

function deleteContract (req, res) {
  let contractId = req.params.contractId

  Contract.findById(contractId, (err, contract) => {
    if(err) res.status(500).send({message: `Error al borrar el contrato ${err}`})

    contract.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el contrato ${err}`})
      res.status(200).send({message: `El contrato se ha sido eliminado`})
    })
  })
}
module.exports = {
  getContract,
  getContracts,
  saveContract,
  updateContract,
  deleteContract
}
