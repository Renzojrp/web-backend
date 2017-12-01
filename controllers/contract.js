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

    Publication.populate(contract, {path: "publication"}, function(err, contract){
      Instrument.populate(contract, {path: "publication.instrument"}, function(err, contract){
        Musician.populate(contract, {path: "publication.instrument.musician"}, function(err, contract){
          Musician.populate(contract, {path: "musician"}, function(err, contract){
            User.populate(contract, {path: "publication.instrument.musician.user"}, function(err, contract){
              Craftman.populate(contract, {path: "craftman"}, function(err, contract){
                User.populate(contract, {path: "musician.user"}, function(err, contract){
                  User.populate(contract, {path: "craftman.user"}, function(err, contract){
                    Order.populate(contract, {path: "order"}, function(err, contract){
                      Instrument.populate(contract, {path: "order.instrument"}, function(err, contract){
                        Musician.populate(contract, {path: "order.instrument.musician"}, function(err, contract){
                          User.populate(contract, {path: "order.instrument.musician.user"}, function(err, contract){
                            Craftman.populate(contract, {path: "order.craftman"}, function(err, contract){
                              User.populate(contract, {path: "order.craftman.user"}, function(err, contract){
                                res.send(200, { contract })
                              });
                            });
                          });
                        });
                      });
                    });
                  });
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

    Publication.populate(contracts, {path: "publication"}, function(err, contracts){
      Instrument.populate(contracts, {path: "publication.instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "publication.instrument.musician"}, function(err, contracts){
          Musician.populate(contracts, {path: "musician"}, function(err, contracts){
            User.populate(contracts, {path: "publication.instrument.musician.user"}, function(err, contracts){
              Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
                User.populate(contracts, {path: "musician.user"}, function(err, contracts){
                  User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                    Order.populate(contracts, {path: "order"}, function(err, contracts){
                      Instrument.populate(contracts, {path: "order.instrument"}, function(err, contracts){
                        Musician.populate(contracts, {path: "order.instrument.musician"}, function(err, contracts){
                          User.populate(contracts, {path: "order.instrument.musician.user"}, function(err, contracts){
                            Craftman.populate(contracts, {path: "order.craftman"}, function(err, contracts){
                              User.populate(contracts, {path: "order.craftman.user"}, function(err, contracts){
                                res.send(200, { contracts })
                              });
                            });
                          });
                        });
                      });
                    });
                  });
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

    Publication.populate(contracts, {path: "publication"}, function(err, contracts){
      Instrument.populate(contracts, {path: "publication.instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "publication.instrument.musician"}, function(err, contracts){
          Musician.populate(contracts, {path: "musician"}, function(err, contracts){
            User.populate(contracts, {path: "publication.instrument.musician.user"}, function(err, contracts){
              Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
                User.populate(contracts, {path: "musician.user"}, function(err, contracts){
                  User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                    Order.populate(contracts, {path: "order"}, function(err, contracts){
                      Instrument.populate(contracts, {path: "order.instrument"}, function(err, contracts){
                        Musician.populate(contracts, {path: "order.instrument.musician"}, function(err, contracts){
                          User.populate(contracts, {path: "order.instrument.musician.user"}, function(err, contracts){
                            Craftman.populate(contracts, {path: "order.craftman"}, function(err, contracts){
                              User.populate(contracts, {path: "order.craftman.user"}, function(err, contracts){
                                res.send(200, { contracts })
                              });
                            });
                          });
                        });
                      });
                    });
                  });
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

    Publication.populate(contracts, {path: "publication"}, function(err, contracts){
      Instrument.populate(contracts, {path: "publication.instrument"}, function(err, contracts){
        Musician.populate(contracts, {path: "publication.instrument.musician"}, function(err, contracts){
          Musician.populate(contracts, {path: "musician"}, function(err, contracts){
            User.populate(contracts, {path: "publication.instrument.musician.user"}, function(err, contracts){
              Craftman.populate(contracts, {path: "craftman"}, function(err, contracts){
                User.populate(contracts, {path: "musician.user"}, function(err, contracts){
                  User.populate(contracts, {path: "craftman.user"}, function(err, contracts){
                    Order.populate(contracts, {path: "order"}, function(err, contracts){
                      Instrument.populate(contracts, {path: "order.instrument"}, function(err, contracts){
                        Musician.populate(contracts, {path: "order.instrument.musician"}, function(err, contracts){
                          User.populate(contracts, {path: "order.instrument.musician.user"}, function(err, contracts){
                            Craftman.populate(contracts, {path: "order.craftman"}, function(err, contracts){
                              User.populate(contracts, {path: "order.craftman.user"}, function(err, contracts){
                                res.send(200, { contracts })
                              });
                            });
                          });
                        });
                      });
                    });
                  });
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
  contract.publication = req.body.publication
  contract.order = req.body.order
  contract.musician = req.body.musician
  contract.craftman = req.body.craftman
  contract.price = req.body.price
  contract.type = req.body.type

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
