const express = require('express')
const router = express.Router()
const connection = require("../db")


router.get("/user", (req, res) => {
    connection.query("SELECT id, prenom, nom, email FROM user", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.put('/user/:id', (req, res) => {
    const id = req.params.id
    const newData = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        lieu: req.body.lieu
    }
    connection.query(`UPDATE user SET ? WHERE id = ${id}`, newData, (err, result) => {
        if (result) {
            res.status(200).send(`Les informations de ${newData.prenom} ont été mises à jour.`)

        } else {
            res.status(400).send('Les données insérées ne sont pas prises en compte')
        }
    })
})

router.delete("/user/:id", (req, res) => {

    const id = req.params.id;
    connection.query(`DELETE FROM user WHERE id = ${id}`, (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'utilisateur numéro ${id} a bien été supprimé`)
    })
})


router.get("/profile/:id", async (req, res) => { // Comprend SES POST et SES INFOS
    const userId = req.params.id
    let profileData

     connection.query(`SELECT nom, prenom, date, image, description, lieu FROM user WHERE id = ${userId}`, (err, result) => {
        if (err) throw err
        profileData = result[0]

        connection.query(`SELECT * FROM post WHERE user_id = ${userId} AND reponse_id IS NULL`, (err, result) => {
            if (err) throw err 
            profileData.post = result
            res.status(200).send(profileData)
        })
        
    })

})


module.exports = router