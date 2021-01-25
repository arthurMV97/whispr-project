const express = require('express')
const router = express.Router()
const connection = require("../db")

router.get("/post", (req, res) => {
    connection.query("SELECT * FROM post", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})


router.get("/post/:userID", (req, res) => {
    const user_id = req.params.userID 

    connection.query(`SELECT * FROM post INNER JOIN abonnement ON post.user_id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${user_id} AND post.reponse_id IS NULL`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})


router.get("/favoris/:id", (req, res) => { //GET les posts mis en favoris
    const userId = req.params.id

    connection.query(`SELECT * FROM post INNER JOIN favoris ON post.id = favoris.post_id WHERE favoris.user_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
}) 

module.exports = router