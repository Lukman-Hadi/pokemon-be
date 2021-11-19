const mysql = require('mysql2');
const { dbHOST, dbNAME, dbPASS, dbUSER } = require('../app/config')

const db = mysql.createConnection({
    host: dbHOST,
    user: dbUSER,
    password: dbPASS,
    database: dbNAME,
});

// For pool initialization, see above
// pool.getConnection(function (err, conn) {
//     // Do something with the connection
//     conn.query({sql:'SELECT 1+2 as result FROM DUAL'},(err, res, field)=>{
//         console.log(err);
//         console.log(res);
//         // console.log(field);
//     });
//     // Don't forget to release the connection when finished!
//     pool.releaseConnection(conn);
//     return;
// })

module.exports = db