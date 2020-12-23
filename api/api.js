const express = require("express");
const app = express();
const port = 8080;
const domain = 'localhost';
const connection = require("./db")
const config = require("./config")
const bcrypt = require('bcrypt')
const saltRound = 10
const jwt = require('jsonwebtoken')
app.use(express.urlencoded({extended: false}))
app.use(express.json())



//------ ROUTES CONNEXION -------

app.post("/sign-up", (req, res) => {
    const user = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
        date: new Date(req.body.date)
    }

    let hash = bcrypt.hashSync(user.password, saltRound)
    user.password = hash;
  
    connection.query("INSERT INTO user SET ?", user, (err, result) => {
        if (err) throw err
        res.send(`${user.prenom} ${user.nom} a été ajouté à la base de données`)
    })

})

app.post("/sign-in", (req, res) => {
    const userConnect = {
        email: req.body.email,
        password: req.body.password
    }

    connection.query("SELECT * FROM user WHERE email = ?", userConnect.email, (err, result) => {
        if (err) throw err;
        console.log(result)
        
        if(result.length < 1) {
            res.status(400).send('Email invalide')
        }
        else {
            let token = jwt.sign({email: result[0].email, id: result[0].id}, config.secret)
            let hashed = result[0].password
            bcrypt.compare(userConnect.password, hashed, (err, result) => {
                if (result) {
                    console.log(result)
                    res.status(200).send({token})
                } else {
                    res.status(400).send('Mot de passe ou email invalide')
                }
            })
        }
        
    })
})

//------ ROUTES USER -------

app.put('/user/:id', (req, res) => {
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

app.delete("/user/:id", (req, res) => {

    const id = req.params.id;
    connection.query(`DELETE FROM user WHERE id = ${id}`, (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'utilisateur numéro ${id} a bien été supprimé`)
    })
})


app.get("/profile/:id", async (req, res) => { // Comprend SES POST et SES INFOS
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


//------ ROUTES PUBLICATIONS -------

app.get("/post", (req, res) => {
    const user_id = req.body.user_id //Plus tard dans token

    connection.query(`SELECT * FROM post INNER JOIN abonnement ON post.user_id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${user_id} AND post.reponse_id IS NULL`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

app.post("/post", (req, res) => { //Manque prise en compte des images
    const postInfo = {
        user_id: req.body.user_id, //Plus tard dans token
        reponse_id: req.body.reponse_id,
        date: new Date(),
        content: req.body.content,
    }
    

    connection.query("INSERT INTO post SET ?", postInfo, (err, result) => {
        if (err) throw err
        if(result.length < 1) {
        res.status(400).send('Les données insérées ne sont pas prises en charge')
        }
        else {
            res.status(200).send('Le post a bien été publié')
        }
    })
})

app.delete("/post/:id", (req, res) => {
    const id = req.params.id

    connection.query(`DELETE FROM post WHERE id = ${id}`, (err, result) => {
        if (err) throw err 
        res.status(200).send(`Le post numéro ${id} a bien été supprimé`)
    })
})


//------ ROUTES ABONNEMENTS -------

app.get("/abonnements/:id", (req, res) => {
    const userId = req.params.id

    connection.query(`SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.compte_abonnement_id WHERE abonnement.user_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

app.get("/abonnes/:id", (req, res) => {
    const userId = req.params.id

    connection.query(`SELECT user.id, nom, prenom, image FROM user INNER JOIN abonnement ON user.id = abonnement.user_id WHERE abonnement.compte_abonnement_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

app.post("/suivre/:id", (req, res) => {
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

app.delete("/suivre/:id", (req, res) => {
    const idUserToUnfollow = req.params.id
    const user_id = req.body.user_id //Plus tard dans token
    

    connection.query(`DELETE FROM abonnement WHERE compte_abonnement_id = ${idUserToUnfollow} AND user_id = ${user_id}` , (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'abonnement numéro ${idUserToUnfollow} a bien été supprimé`)
    })
})


//------ ROUTES FAVORIS -------

app.get("/favoris/:id", (req, res) => { //GET les posts mis en favoris
    const userId = req.params.id

    connection.query(`SELECT * FROM post INNER JOIN favoris ON post.id = favoris.post_id WHERE favoris.user_id = ${userId}`, (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
}) 

app.post("/favoris/:id", (req, res) => {
    const favorisData = {
        user_id: req.body.user_id, //Plus tard dans token
        post_id: req.params.id,
        date: new Date()
    }

    connection.query("INSERT INTO favoris SET ?", favorisData, (err, result) => {
        if (err) throw err
        if(result.length < 1) {
        res.status(400).send("Le post n'existe pas ou plus")
        }
        else {
            res.status(200).send("Le post a bien été ajouté à vos favoris")
        }
    })

})

app.delete("/favoris/:id", (req, res) => {
    const idPostToUnlike = req.params.id
    const user_id = req.body.user_id //Plus tard dans token

    connection.query(`DELETE FROM favoris WHERE post_id = ${idPostToUnlike} AND user_id = ${user_id}` , (err, result) => {
        if (err) throw err 
        res.status(200).send(`Le post numéro ${idPostToUnlike} a bien été supprimé des favoris`)
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}/${port}/`)
})

//------ ROUTES GENERALES -------

app.get("/user", (req, res) => {
    connection.query("SELECT id, prenom, nom, email FROM user", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

app.get("/post", (req, res) => {
    connection.query("SELECT * FROM post", (err, result) => {
        if (err) throw err
        res.status(200).send(result)
    })
})

