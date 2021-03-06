const express = require('express')
const router = express.Router()
const connection = require("../db")
const config = require("../config")
const jwt = require('jsonwebtoken')



router.use('/sign-in', (req, res, next) => {
    const query = "SELECT email FROM user WHERE email = ?"
    connection.query(query, req.body.email, (err, result) => {

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

router.use('/admin-sign-in', (req, res, next) => {
    const query = "SELECT identifiant FROM admin WHERE identifiant = ?"
    connection.query(query, req.body.identifiant, (err, result) => {

        console.log('middleware')
        console.log(req.body.identifiant);
        console.log(result[0])
        if (result[0] === undefined) {
            res.status(400).send('Cet admin n\'existe pas')
            
        }
        else if (result[0]) {
            next()
        }
    })
    
})

router.use('/abonnements', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/recherche', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/engagement', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/random', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/comments', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/feed', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/user', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})


router.use('/abonnes', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/suivre', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/post', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/favoris', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})
router.use('/profile', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config.secret, (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})



router.use('/post-admin', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config["admin-secret"], (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})

router.use('/delete-user', (req, res, next) => {
    tokenToVerify = req.headers.authorization
    jwt.verify(tokenToVerify, config["admin-secret"], (err, decoded) => {
        if (err) {
            res.status(404).send("Accès impossibe")
        } else {
            next()
        }
    }) 
})



module.exports = router