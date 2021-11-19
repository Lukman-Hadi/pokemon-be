const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    // db
    dbHOST: process.env.DBHOST,
    dbUSER: process.env.DBUSER,
    dbPASS: process.env.DBPASS,
    dbNAME: process.env.DBNAME,
}