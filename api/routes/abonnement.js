const express = require('express')
const router = express.Router()
const connection = require("../db")

router.get("/abonnements/:id", (req, res) => {
    const userId = req.params.id
    const query = "SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ?"
    connection.query(query, userId, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/abonnes/:id", (req, res) => {
    const userId = req.params.id
    const query = "SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.user_id WHERE abonnement.compte_abonnement_id = ?"
    connection.query(query, userId, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.post("/suivre/:id", (req, res) => {
    const followingData = {
        user_id: req.body.user_id, 
        compte_abonnement_id: req.params.id,
        date: new Date()
    }
    console.log(followingData)
    const query = "INSERT INTO abonnement SET ?"
    connection.query(query, followingData, (err, result) => {
        if (err) throw err
        if(result.length < 1) {
        res.status(400).send("L'utiisateur n'existe pas ou plus")
        }
        else {
            res.status(200).send("L'utilisateur a bien été ajouté à vos abonnements")
        }
    })
})

router.delete("/suivre/:id/:userId", (req, res) => {
    const idUserToUnfollow = req.params.id
    const user_id = req.params.userId //Plus tard dans token
    console.log(idUserToUnfollow, user_id)
    const query = "DELETE FROM abonnement WHERE compte_abonnement_id = ? AND user_id = ?"
    
    connection.query(query, [idUserToUnfollow, user_id] , (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'abonnement numéro ${idUserToUnfollow} a bien été supprimé`)
    })
})




module.exports = router