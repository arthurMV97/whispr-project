const express = require('express')
const router = express.Router()
const connection = require("../db")

router.get("/abonnements/:id", (req, res) => {
    const userId = req.params.id

    connection.query(`SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/abonnes/:id", (req, res) => {
    const userId = req.params.id

    connection.query(`SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.user_id WHERE abonnement.compte_abonnement_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.post("/suivre/:id", (req, res) => {
    const followingData = {
        user_id: req.body.user_id, //Plus tard dans token
        compte_abonnement_id: req.params.id,
        date: new Date()
    }

    connection.query("INSERT INTO abonnement SET ?", followingData, (err, result) => {
        if (err) throw err
        if(result.length < 1) {
        res.status(400).send("L'utiisateur n'existe pas ou plus")
        }
        else {
            res.status(200).send("L'utilisateur a bien été ajouté à vos abonnements")
        }
    })
})

router.delete("/suivre/:id", (req, res) => {
    const idUserToUnfollow = req.params.id
    const user_id = req.body.user_id //Plus tard dans token
    

    connection.query(`DELETE FROM abonnement WHERE compte_abonnement_id = ${idUserToUnfollow} AND user_id = ${user_id}` , (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'abonnement numéro ${idUserToUnfollow} a bien été supprimé`)
    })
})




module.exports = router