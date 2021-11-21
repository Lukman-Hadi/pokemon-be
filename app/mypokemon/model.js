const { pool } = require('../../database');
const util = require('util')

const Pokemon = function (pokemon) {
    this.pokemon_id = pokemon.id;
    this.user_id = pokemon.user_id;
    this.name = pokemon.name;
}

Pokemon.getAll = (id, result) => {
    pool.query('SELECT * FROM user_pokemon WHERE user_id = ?', id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log("tutorials: ", res);
        result(null, res);
    })
};
Pokemon.getLog = async (id) => {
    promisePool = pool.promise();
    const [rows] = await promisePool.query('SELECT COUNT(id) as count FROM renname_log WHERE mypokemon_id = ?', id);
    return rows;
}

Pokemon.create = (newPokemon, result) => {
    pool.query('INSERT INTO user_pokemon SET ?', newPokemon, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log('pokemon stored');
        result(null, { id: res.insertId, ...newPokemon })
    })
}

Pokemon.rename = (id, pokemon, result) => {
    pool.query('UPDATE user_pokemon SET name = ? where id = ?', [pokemon.name, id], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('updated', pokemon)
        result(null, pokemon)
    })
}

Pokemon.remove = (id, result) => {
    sql.query("DELETE FROM user_pokemon WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted", pokemon);
        result(null, res);
    });
};

module.exports = Pokemon;