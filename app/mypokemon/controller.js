const { isPrime, fifteenPobaility, fibonacci } = require('../utils');
const Pokemon = require('./model');
const { pool } = require('../../database');

const find = (req, res) => {
    Pokemon.getAll(req.body.id, (err, data) => {
        if (err) {
            return res.status(500).send({
                error: 1,
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        } else {
            return res.send(data);
        }
    })
}

const deletePokemon = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Pokemon.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Pokemon with id ${req.params.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Pokemon with id " + req.params.id
                });
            }
        } else {
            return res.send({ message: `Pokemon Deleted` });
        }
    })
}
const renamePokemon = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }    
    const log = await Pokemon.getLog(req.params.id);
    const number = fibonacci(log[0].count);    
    newPokemon = new Pokemon({
        name: `${req.body.name}-${number}`,
    })
    Pokemon.rename(req.params.id, newPokemon, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Pokemon with id ${req.params.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error updating Pokemon with id " + req.params.id
                });
            }
        } else {
            return res.send(data);
        }
    })
}

const release = (req, res) => {
    let release = isPrime()
    return res.send({
        can: release,
        message: 'Release'
    })
}

const catchPokemon = (req, res) => {
    let catchPokemon = fifteenPobaility();
    return res.send({
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