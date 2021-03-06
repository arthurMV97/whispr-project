const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRound = 10
const connection = require("../db")
const jwt = require('jsonwebtoken')
const config = require("../config")

//------ ROUTE INSCRIPTION USER -------

router.post("/sign-up", (req, res) => {
    console.log(typeof req.body.date, req.body.date)
    const user = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
        date: new Date(req.body.date),
    }

    let hash = bcrypt.hashSync(user.password, saltRound)
    user.password = hash;
  const query = "INSERT INTO user SET ?"
    connection.query(query, user, (err, result) => {
        if (err) throw err
        res.send(`${user.prenom} ${user.nom} a été ajouté à la base de données`)
    })

})

//------ ROUTE CONNEXION USER -------

router.post("/sign-in", (req, res) => {
    const userConnect = {
        email: req.body.email,
        password: req.body.password
    }
    const query = "SELECT * FROM user WHERE email = ?"
    connection.query(query, userConnect.email, (err, result) => {
        if (err) throw err;
    
        if (result.length < 1) {
            res.status(401).send('Email invalide')
        }
        else {
            console.log(config);
            let token = jwt.sign({email: result[0].email, id: result[0].id, image: result[0].image, nom: result[0].nom, prenom: result[0].prenom},  config.secret)
            let hashed = result[0].password
            bcrypt.compare(userConnect.password, hashed, (err, result) => {
                if (result) {
                    console.log(result)
                    res.status(200).send({token})
                } else {
                    console.log('Mot de passe invalide')
                    res.status(401).send('Mot de passe invalide')
                }
            })
        }
        
    })
})

//------ ROUTE CONNEXION ADMIN -------

router.post('/admin-sign-in', (req, res) => {
    const adminConnect = {
        identifiant: req.body.identifiant,
        password: req.body.password
    }
    const query = "SELECT * FROM admin WHERE identifiant = ?'"
    connection.query(query, adminConnect.identifiant,  (err, result) => {
        if (err) throw err;
        console.log('result1>>>',result)
        
        if(result.length < 1) {
            res.status(401).send('Identifiant invalide')
        }
        else {
            let token = jwt.sign({identifiant: result[0].identifiant, id: result[0].id, statut: result[0].statut, nom: result[0].nom, prenom: result[0].prenom }, config["admin-secret"])
            let hashed = result[0].password
            bcrypt.compare(adminConnect.password, hashed, (err, result) => {
                if (result) {
                    console.log('result 2 >>', result)
                    res.status(200).send({token})
                } else {
                    console.log('Mot de passe invalide')
                    res.status(401).send('Mot de passe ou email invalide')
                }
            })
        }

    })

})

module.exports = router