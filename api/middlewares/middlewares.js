const express = require('express')
const router = express.Router()
const connection = require("../db")

router.use('/sign-in', (req, res, next) => {
    connection.query("SELECT email FROM user WHERE email = ?", req.body.email, (err, result) => {

        console.log('middleware')
        console.log(req.body.email);
        console.log(result[0])
        if (result[0] === undefined) {
            res.status(400).send('Cet email n\'existe pas')
            
        }
        else if (result[0]) {
            next()
        }
    })
    
})

module.exports = router