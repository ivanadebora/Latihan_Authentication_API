const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'db4free.net',
    user: 'ivanadebora',
    password: 'vandeb0703',
    database: 'popokpedia1',
    port: 3306
});

module.exports = conn