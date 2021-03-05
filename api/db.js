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

connection.query('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, nom TEXT, prenom TEXT, date DATE, email TEXT, password TEXT, image TEXT, description TEXT, lieu TEXT) ;')




module.exports = connection