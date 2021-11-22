const { pool } = require('../../database');
const bcrypt = require('bcrypt');

const Users = function (users) {
    this.username = users.username;
    this.password = users.password;
};

Users.create = (newUsers, result) => {
    pool.query('INSERT INTO users SET ?', newUsers, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return
        }
        console.log('user created');
        result(null, { id: res.insertId, ...newUsers })
    })
}

Users.login =(users, result) => {
    pool.query('SELECT id,username,password FROM users where username = ?', users.username,async (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return
        };
        if (res.length) {
            console.log("found users: ", res[0]);
            if (bcrypt.compareSync(users.password, res[0].password)) {
                delete res[0]['password'];
                let id = res[0].id;
                const promisePool = pool.promise();
                try{
                    let [rows] = await promisePool.query('SELECT id,pokemon_id,name FROM user_pokemon WHERE user_id = ?',id);
                    return result(null,{users:res[0],pokemon:rows})
                }catch(err){
                    console.log('err', err);
                    result({ kind: "not_found" }, null);
                    return
                }
                // result(null, res[0]);
                // return;
            } else {
                result({ kind: "not_found" }, null);
                return;
            }
        }
        result({ kind: "not_found" }, null);
        return;
    })
}

module.exports = Users;