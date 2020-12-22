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
            res.status(401).send('Email invalide')
        }
        else {
            let token = jwt.sign({email: result[0].email, id: result[0].id}, config.secret)
            let hashed = result[0].password
            bcrypt.compare(userConnect.password, hashed, (err, result) => {
                if (result) {
                    res.status(200).send({token})
                } else {
                    res.status(403).send('Mot de passe ou email invalide')
                }
            })
        }
        
    })
})




app.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}/${port}/`)
})