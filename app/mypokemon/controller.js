const { isPrime, fifteenPobaility, fibonacci } = require('../utils');
const Pokemon = require('./model');
const { pool } = require('../../database');

const find = (req, res) => {
    Pokemon.getAll(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send({
                error: 1,
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        } else {
            return res.send({ data });
        }
    })
}

const store = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const payload = req.body;
    const newPokemon = new Pokemon({
        pokemon_id: payload.pokemon_id,
        user_id: payload.user_id,
        name: `${payload.name}-0`
    });
    Pokemon.create(newPokemon, (err, data) => {
        if (err) {
            return res.status(500).send({
                error: 1,
                message: err.message || 'Some error occured'
            })
        }
        return res.send({ error: 0, message: 'Success add to your pocket', data });
    })
}

const deletePokemon = (req, res) => {
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
    let message = release.isOk ? 'Release Success' : 'Release Failed';
    return res.send({
        can: release,
        message
    })
}

const catchPokemon = (req, res) => {
    let catchPokemon = fifteenPobaility();
    let message = catchPokemon ? 'Catch Success' : 'Catch Failed';
    return res.send({
        can: catchPokemon,
        message
    })
}

module.exports = {
    find,
    release,
    catchPokemon,
    deletePokemon,
    renamePokemon,
    store
}