const { isPrime, fifteenPobaility, fibonacci } = require('../utils');
const Pokemon = require('./model');

const find = (req, res) => {
    Pokemon.getAll(req.body.id, (err, data) => {
        if (err)
            res.status(500).send({
                error: 1,
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        res.send(data);
    })
}

const deletePokemon = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Pokemon.remove(req.body.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pokemon with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Pokemon with id " + req.body.id
                });
            }
        }
        res.send({ message: `Pokemon Deleted` });
    })
}
//todo renane
const renamePokemon = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const number = fibonacci()
    newPokemon = new Pokemon({
        name:fibonnaciName,
    })
    Pokemon.rename(req.body.id, new Pokemon(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Pokemon with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Pokemon with id " + req.body.id
                });
            }
        }
        res.send(data);
    })
}

const release = (req, res) => {
    let release = isPrime()
    res.send({
        can: release,
        message: 'Release'
    })
}

const catchPokemon = (req, res) => {
    let catchPokemon = fifteenPobaility();
    res.send({
        can: catchPokemon,
        message: 'Catch'
    })
}

module.exports = {
    find,
    release,
    catchPokemon,
    deletePokemon,
    renamePokemon
}