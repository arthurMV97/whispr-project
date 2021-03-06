const express = require('express')
const router = express.Router()
const connection = require("../db")


router.get("/user", (req, res) => {
    const query = "SELECT id, prenom, nom, email FROM user"
    connection.query(query, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/random", (req, res) => {
    const query = "SELECT id, prenom, nom, lieu, image, description FROM user ORDER BY RAND() limit 7"
    connection.query(query, (err, result) => {
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
    const query = "UPDATE user SET ? WHERE id = ?"
    connection.query(query, [newData, id], (err, result) => {
        if (err) throw err;
    
        if (result.length < 1) {
            res.status(401).send('Les données insérées ne sont pas prises en compte')
        }
        else {
            res.status(200).send(`Les informations de ${newData.prenom} ont été mises à jour.`)

        }
    })
})

router.delete("/delete-user/:id", (req, res) => {

    const id = req.params.id;
    const query = "DELETE abonnement, user FROM abonnement INNER JOIN user ON user.id = ? WHERE abonnement.user_id = ? OR abonnement.compte_abonnement_id = ?"
    connection.query(query, [id, id, id], (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'utilisateur numéro ${id} a bien été supprimé`)
    })
})


router.get("/profile/:id", async (req, res) => { // Comprend SES POST et SES INFOS
    const userId = req.params.id
    let profileData
    const query = "SELECT id, nom, prenom, image, description, lieu, (SELECT GROUP_CONCAT(abonnement.compte_abonnement_id) FROM abonnement WHERE user_id = ?) AS abonnements, (SELECT GROUP_CONCAT(abonnement.user_id) FROM abonnement WHERE compte_abonnement_id = ?) AS abonnes FROM user WHERE id = ?"
     connection.query(query, [userId, userId, userId], (err, result) => {
        if (err) throw err
        profileData = result[0]

        res.status(200).send(profileData)
        
    })

})


module.exports = router