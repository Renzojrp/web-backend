'use strict'

const Publication = require('../models/publication')
const Musician = require('../models/musician')
const Craftman = require('../models/craftman')
const Contract = require('../models/contract')
const Instrument = require('../models/instrument')
const Order = require('../models/order')
const User = require('../models/user')

function getContract (req, res){
  let contractId = req.params.contractId

  Contract.findById(contractId, (err, contract) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contract) return res.status(484).send({message: `El contrato no existe`})

    User.populate(contract, {path: "musician.user"}, function(err, contract){
      Instrument.populate(contract, {path: "instrument"}, function(err, contract){
        Musician.populate(contract, {path: "instrument.musician"}, function(err, contract){
          User.populate(contract, {path: "instrument.musician.user"}, function(err, contract){
            Craftman.populate(contract, {path: "craftman"}, function(err, contract){
              User.populate(contract, {path: "craftman.user"}, function(err, contract){
                Musician.populate(contract, {path: "musician"}, function(err, contract){
                  res.send(200, { contract })
                });
              });
            });
          });
        });
      });
    });

  })
}

function getContracts (req, res) {
  Contract.find({}, function(err,contracts){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(404).send({message: `No existen contratos`})

    User.populate(contracts, {path: "musician.user"}, function(err, contracts){
      Instrument.populate(contracts, {path: "instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "instrument.musician"}, function(err, contracts){
          User.populate(contracts, {path: "instrument.musician.user"}, function(err, contracts){
            Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
              User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                Musician.populate(contracts, {path: "musician"}, function(err, contracts){
                  res.send(200, { contracts })
                });
              });
            });
          });
        });
      });
    });

  })
}

function  getContractByMusician (req, res){
  let musicianId = req.params.musicianId

  Contract.find({"musician":musicianId}, (err, contracts) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(484).send({message: `No existen contratos para este músico: ${contracId}`})

    User.populate(contracts, {path: "musician.user"}, function(err, contracts){
      Instrument.populate(contracts, {path: "instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "instrument.musician"}, function(err, contracts){
          User.populate(contracts, {path: "instrument.musician.user"}, function(err, contracts){
            Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
              User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                Musician.populate(contracts, {path: "musician"}, function(err, contracts){
                  res.send(200, { contracts })
                });
              });
            });
          });
        });
      });
    });

  })
}

function getContractByCraftman (req, res){
  let craftmanId = req.params.craftmanId

  Contract.find({"craftman":craftmanId}, (err, contracts) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!contracts) return res.status(484).send({message: `No existen contratos para este artesano: ${contracId}`})

    User.populate(contracts, {path: "musician.user"}, function(err, contracts){
      Instrument.populate(contracts, {path: "instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "instrument.musician"}, function(err, contracts){
          User.populate(contracts, {path: "instrument.musician.user"}, function(err, contracts){
            Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
              User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                Musician.populate(contracts, {path: "musician"}, function(err, contracts){
                  res.send(200, { contracts })
                });
              });
            });
          });
        });
      });
    });

  })
}

function saveContract (req, res) {
  console.log('POST /api/contract')
  console.log(req.body)

  let contract = new Contract()
  contract.instrument = req.body.instrument
  contract.musician = req.body.musician
  contract.craftman = req.body.craftman
  contract.price = req.body.price
  contract.type = req.body.type
  contract.description = req.body.description

  contract.save((err, contractStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({contract: contractStored})
  })
}

function updateContract (req, res) {
  let contractId = req.params.contractId
  let update = req.body

  Contract.findByIdAndUpdate(contractId, update, (err, contractUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el presupuesto ${err}`})

    res.status(200).send({ contract: contractUpdated})
  })
}

function deleteContract (req, res) {
  let contractId = req.params.contractId

  Contract.findById(contractId, (err, contract) => {
    if(err) res.status(500).send({message: `Error al borrar el contrato ${err}`})

    contract.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el contrato ${err}`})
        res.status(200).send({message: `El contrato ha sido eliminado`})
    })
  })
}

module.exports = {
  getContract,
  getContracts,
  getContractByCraftman,
  getContractByMusician,
  saveContract,
  updateContract,
  deleteContract
}
