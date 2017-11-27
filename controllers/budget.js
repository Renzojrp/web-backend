'use strict'

const Publication = require('../models/publication')
const Musician = require('../models/musician')
const Craftman = require('../models/craftman')
const Budget = require('../models/budget')
const Instrument = require('../models/instrument')
const User = require('../models/user')

function getBudget (req, res){
  let budgetId = req.params.budgetId

  Budget.findById(budgetId, (err, budget) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!budget) return res.status(484).send({message: `El presupuesto no existe`})

    Publication.populate(budget, {path: "publication"}, function(err, budget){
      Instrument.populate(budget, {path: "publicaton.instrument"}, function(err, budget){
        Musician.populate(budget, {path: "publicaton.instrument.musician"}, function(err, budget){
          Musician.populate(budget, {path: "musician"}, function(err, budget){
            User.populate(budget, {path: "publicaton.instrument.musician.user"}, function(err, budget){
              Craftman.populate(budget, {path: "craftman"}, function(err, budget){
                User.populate(budget, {path: "musician.user"}, function(err, budget){
                  User.populate(budget, {path: "craftman.user"}, function(err, budget){
                    res.send(200, { budget })
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

function getBudgets (req, res) {
  Budget.find({}, function(err,budgets){
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!budgets) return res.status(404).send({message: `No existen presupuestos`})

    Publication.populate(budgets, {path: "publicaton"}, function(err, budgets){
      Instrument.populate(budgets, {path: "publicaton.instrument"}, function(err, budgets){
        Musician.populate(budgets, {path: "publicaton.instrument.musician"}, function(err, budgets){
          Musician.populate(budgets, {path: "musician"}, function(err, budgets){
            User.populate(budgets, {path: "publicaton.instrument.musician.user"}, function(err, budgets){
              Craftman.populate(budgets, {path: "craftman"}, function(err, budgets){
                User.populate(budgets, {path: "musician.user"}, function(err, budgets){
                  User.populate(budgets, {path: "craftman.user"}, function(err, budgets){
                    res.send(200, { budgets })
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function  getBudgetByPublication (req, res){
  let publicationId = req.params.publicationId

  Budget.find({"publication":publicationId}, (err, budgets) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!budgets) return res.status(484).send({message: `No existen prepuestos para esta publicaion: ${publicationId}`})

    Publication.populate(budgets, {path: "publicaton"}, function(err, budgets){
      Instrument.populate(budgets, {path: "publicaton.instrument"}, function(err, budgets){
        Musician.populate(budgets, {path: "publicaton.instrument.musician"}, function(err, budgets){
          Musician.populate(budgets, {path: "musician"}, function(err, budgets){
            User.populate(budgets, {path: "publicaton.instrument.musician.user"}, function(err, budgets){
              Craftman.populate(budgets, {path: "craftman"}, function(err, budgets){
                User.populate(budgets, {path: "musician.user"}, function(err, budgets){
                  User.populate(budgets, {path: "craftman.user"}, function(err, budgets){
                    res.send(200, { budgets })
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

function getBudgetbyStatus (req, res){
  let status = req.params.status

  Budget.find({"status":"A"}, (err, budgets) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!budgets) return res.status(484).send({message: `No existen presupuestos en estado: ${status}`})

    Publication.populate(budgets, {path: "publicaton"}, function(err, budgets){
      Instrument.populate(budgets, {path: "publicaton.instrument"}, function(err, budgets){
        Musician.populate(budgets, {path: "publicaton.instrument.musician"}, function(err, budgets){
          Musician.populate(budgets, {path: "musician"}, function(err, budgets){
            User.populate(budgets, {path: "publicaton.instrument.musician.user"}, function(err, budgets){
              Craftman.populate(budgets, {path: "craftman"}, function(err, budgets){
                User.populate(budgets, {path: "musician.user"}, function(err, budgets){
                  User.populate(budgets, {path: "craftman.user"}, function(err, budgets){
                    res.send(200, { budgets })
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

function saveBudget (req, res) {
  console.log('POST /api/budget')
  console.log(req.body)

  let budget = new Budget()
  budget.publication = req.body.publication
  budget.musician = req.body.musician
  budget.craftman = req.body.craftman
  budget.price = req.body.price

  budget.save((err, budgetStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({budget: budgetStored})
  })
}

function updateBudget (req, res) {
  let budgetId = req.params.budgetId
  let update = req.body

  Budget.findByIdAndUpdate(budgetId, update, (err, budgetUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el presupuesto ${err}`})

    res.status(200).send({ budget: budgetUpdated})
  })
}

function deleteBudget (req, res) {
  let budgetId = req.params.budgetId

  Budget.findById(budgetId, (err, budget) => {
    if(err) res.status(500).send({message: `Error al borrar el presupuesto ${err}`})

    budget.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el presupuesto ${err}`})
        res.status(200).send({message: `El presupuesto ha sido eliminado`})
    })
  })
}

module.exports = {
  getBudget,
  getBudgets,
  getBudgetByPublication,
  getBudgetbyStatus,
  saveBudget,
  updateBudget,
  deleteBudget
}
