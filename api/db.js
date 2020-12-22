const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'whispr-db'
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the db")
})

module.exports = connection