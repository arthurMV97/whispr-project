const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
const domain = 'localhost';
const connection = require("./db")
const server = require('http').createServer(app)
const connexionRoutes = require('./routes/connexion.js')
const userRoutes = require('./routes/user.js')
const abonnementRoutes = require('./routes/abonnement.js')
const posteRoutes = require('./routes/poste.js')
const middlewares = require('./middlewares/middlewares.js')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})





app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next(); 
})


app.use(middlewares)
app.use(connexionRoutes)
app.use(userRoutes)
app.use(abonnementRoutes)
app.use(posteRoutes)






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





//------ ROUTES FAVORIS -------



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





//----------- SOCKETS  ----------
io.on('connection', socket => {
    console.log('New Websocket Connection');
    socket.emit('message', 'Welcome')
})

//---------------------------------



server.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}:${port}/`)
})

