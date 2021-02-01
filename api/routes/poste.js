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

    connection.query(`SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM post WHERE post.reponse_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id INNER JOIN abonnement ON post.user_id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${user_id} AND post.reponse_id IS NULL`, (err, result) => {
        if (err) throw err
        let postes = result
        res.status(200).send(postes)
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