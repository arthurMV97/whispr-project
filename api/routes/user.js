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
        image: req.body.image,
        description: req.body.description,
        lieu: req.body.lieu
    }
    connection.query(`UPDATE user SET ? WHERE id = ${id}`, newData, (err, result) => {
        if (err) throw err;
    
        if (result.length < 1) {
            res.status(401).send('Les données insérées ne sont pas prises en compte')
        }
        else {
            res.status(200).send(`Les informations de ${newData.prenom} ont été mises à jour.`)

        }
    })
})

router.delete("/user/:id", (req, res) => {

    const id = req.params.id;
    connection.query(`DELETE abonnement, user FROM abonnement INNER JOIN user ON user.id = ${id} WHERE abonnement.user_id = ${id} OR abonnement.compte_abonnement_id = ${id}`, (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'utilisateur numéro ${id} a bien été supprimé`)
    })
})


router.get("/profile/:id", async (req, res) => { // Comprend SES POST et SES INFOS
    const userId = req.params.id
    let profileData

     connection.query(`SELECT id, nom, prenom, image, description, lieu, (SELECT GROUP_CONCAT(abonnement.compte_abonnement_id) FROM abonnement WHERE user_id = ${userId}) AS abonnements, (SELECT GROUP_CONCAT(abonnement.user_id) FROM abonnement WHERE compte_abonnement_id = ${userId}) AS abonnes FROM user WHERE id = ${userId}`, (err, result) => {
        if (err) throw err
        profileData = result[0]

        res.status(200).send(profileData)
        
    })

})


module.exports = router