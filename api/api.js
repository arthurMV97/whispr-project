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


app.get("/user/:id", (req, res) => { // Comprend SES POST, SES LIKES, SES ABONNEMENTS, SES ABONNES

})


//------ ROUTES PUBLICATIONS -------

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

app.post("/suivre/:id", (req, res) => {
    const idUserToFollow = req.params.id;
    const followingData = {
        user_id: req.body.user_id, //Plus tard dans token
        compte_abonnement_id: idUserToFollow,
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
    const user_id = req.body.user_id
    

    connection.query(`DELETE FROM abonnement WHERE compte_abonnement_id = ${idUserToUnfollow} AND user_id = ${user_id}` , (err, result) => {
        if (err) throw err 
        res.status(200).send(`L'abonnement numéro ${idUserToUnfollow} a bien été supprimé`)
    })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}/${port}/`)
})