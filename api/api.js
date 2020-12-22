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

app.delete("user/:id")
app.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}/${port}/`)
})