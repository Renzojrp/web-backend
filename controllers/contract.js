'use strict'

const Contract = require('../models/contract')
const Musician = require('../models/musician')
const Craftman = require('../models/craftman')
const Publication = require('../models/publication')
const User = require('../models/user')

function getContract (req, res){
  let contractId = req.params.contractId

  Contract.findById(contractId, (err, contract) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contract) return res.status(484).send({message: `El contrato no existe`})

    User.populate(contract, {path: "user"}, function(err, contract){
      Craftman.populate(contract, {path: "craftman"}, function(err, contract){
        Publication.populate(contract, {path: "publication"}, function(err, contract){
          res.status(200).send({ contract })
        });
      });
    });
  })
}

function getContracts (req, res) {
  Contract.find({}, (err, contracts) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(404).send({message: `No existen contratos`})

    User.populate(contracts, {path: "user"}, function(err, contracts){
      Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
        Publication.populate(contracts, {path: "publication"}, function(err, contracts){
          res.status(200).send({ contracts })
        });
      });
    });
  })
}

function getContractbyUser (req, res){
  let userId = req.params.userId

  Contract.find({"user":userId}, (err, contracts) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(484).send({message: `No existen contratos del músico: ${publicationUser}`})

    User.populate(contracts, {path: "user"}, function(err, contracts){
      Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
        Publication.populate(contracts, {path: "publication"}, function(err, contracts){
          res.status(200).send({ contracts })
        });
      });
    });
  })
}

function saveContract (req, res) {
  console.log('POST /api/contract')
  console.log(req.body)

  let contract = new Contract()
  contract.user = req.body.user
  contract.craftman = req.body.craftman
  contract.publication = req.body.publication
  contract.state = req.body.state

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
  getContractbyUser,
  saveContract,
  updateContract,
  deleteContract
}
