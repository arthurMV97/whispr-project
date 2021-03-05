const express = require('express')
const router = express.Router()
const connection = require("../db")

router.get("/post", (req, res) => {
    connection.query("SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id ORDER BY `post`.`id` DESC", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/recherche/:caracteres", (req, res) => {
    connection.query(`SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id WHERE post.content LIKE '%${req.params.caracteres}%' OR user.prenom LIKE '%${req.params.caracteres}%' OR user.nom LIKE '%${req.params.caracteres}%' ORDER BY post.id DESC`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/engagement", (req, res) => {
    connection.query("SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id ORDER BY TotalComment DESC limit 10", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

router.get("/post-admin", (req, res) => {
    connection.query("SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id ORDER BY `post`.`id` DESC", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})


router.get("/feed/:userID", (req, res) => {
    const user_id = req.params.userID 

    connection.query(`SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id INNER JOIN abonnement ON post.user_id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${user_id} AND post.reponse_id IS NULL ORDER BY post.id DESC`, (err, result) => {
        if (err) throw err
        let postes = result
        res.status(200).send(postes)

    })
})


router.get("/favoris/:id", (req, res) => { //GET les posts mis en favoris
    const userId = req.params.id

    connection.query(`SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN favoris ON post.id = favoris.post_id INNER JOIN user ON post.user_id = user.id WHERE favoris.user_id = ${userId} AND post.reponse_id IS NULL`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
}) 

router.get("/post/:id", (req, res) => { //GET les posts mis en favoris
    const userId = req.params.id
    console.log('userId:' , userId);
    connection.query(`SELECT post.id, post.content, post.date, post.user_id, user.nom, user.prenom, user.image, (SELECT COUNT(*) FROM favoris WHERE favoris.post_id = post.id) AS TotalFavoris, (SELECT COUNT(*) FROM commentaires WHERE commentaires.post_id = post.id) AS TotalComment FROM post INNER JOIN user ON post.user_id = user.id WHERE post.user_id = ${userId} AND post.reponse_id IS NULL`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
}) 

router.delete("/post/:id", (req, res) => {
    const id = req.params.id

    connection.query(`DELETE FROM post WHERE id = ${id}`, (err, result) => {
        if (err) throw err 
        res.status(200).send(`Le post numéro ${id} a bien été supprimé`)
    })
})

router.get("/comments/:id", (req, res) => {
    const commentId = req.params.id
    const query = 'SELECT * FROM commentaires WHERE commentaires.post_id = ? ORDER BY commentaires.id ASC'
    connection.query(query, commentId, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

module.exports = router