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


//----------- SOCKETS  ----------
let connectedUsers = []
io.on('connection', socket => {

    

    console.log('New Websocket Connection');
    socket.emit('message-console', 'Welcome')

    socket.on('socket-id', (data) => {

        if (data.socket) { //Lorsqu'un utilisateur se connecte les autres user send leurs id mais pas leurs socket id
            if (connectedUsers.find(e => e.user === data.user)) {
                const index = connectedUsers.findIndex(e => e.user === data.user)
                connectedUsers.splice(index, 1, data)
            }
            else {
                connectedUsers.push(data)
    
            }
        }
        console.log('User Connected');
    })

    socket.on('posteData', (data) => {
        const posteToDB = {
            user_id: data.user_id, 
            reponse_id: data.reponse_id,
            date: new Date(),
            content: data.content,
        }

        const sendToFront = {
            user_id: data.user_id,
            image: data.image,
            prenom: data.prenom,
            nom: data.nom,
            content: data.content,
            TotalFavoris: 0,
            TotalComment: 0,
            date: new Date(),

        }
        const query = "INSERT INTO post SET ?"        
        connection.query(query, posteToDB, (err, res) => {
            if (err) throw err

            if(res.length < 1) {
                socket.emit('message-console', 'Les données insérées ne sont pas prises en charge')

            }
            else {
                const query ="SELECT abonnement.user_id FROM abonnement WHERE abonnement.compte_abonnement_id = ?"
                const userId = data.user_id
                connection.query(query, userId, (err, result) => {
                    if (err) throw err
                    connectedUsers.forEach(e => {
                        if (result.find(elem => e.user === elem.user_id)) { //SI l'id de la db est egal a un des id du tableau connected user
                            io.to(e.socket).emit('new-post',sendToFront)
                        }
                    

                    })
                })
            }
        })
    })
    socket.on('rooming', (data) => {
        socket.join(`room-${data.user}-${data.id}`)
    })

    socket.on('leave-room', (data) => {
        socket.leave(`room-${data.user}-${data.id}`)
     
    })

    socket.on('like-post', (data) => {
        const favorisData = {
            user_id: data.userId, 
            post_id: data.postId,
            date: new Date()
        }
        const query = "INSERT INTO favoris SET ?"

        connection.query(query, favorisData, (err, result) => {
            if (err) throw err
            if(result.length < 1) {
            socket.emit('message-console', "le post n'existe pas ou plus")
            }
            else {
                io.in(`room-${data.postUser}-${data.postId}`).emit('liked-post', data)
            }
        })
    })
    socket.on('unlike-post', (data) => {
        console.log(data);
        const post_id = data.postId
        const user_id = data.userId
        const query = "DELETE FROM favoris WHERE post_id = ? AND user_id = ?"

        connection.query(query, [post_id, user_id], (err, result) => {
        if (err) throw err 
        io.in(`room-${data.postUser}-${data.postId}`).emit('unliked-post', data)    })
      
    })

    socket.on('new-comment', data => {
        
        const commentToDB = {
            post_id: data.post_id,
            content: data.content,
            user_id: data.user_id,
            image: data.image,
            date: new Date()}

        const query = "INSERT INTO commentaires SET ?"        
        
        connection.query(query, commentToDB, (err, res) => {
            if (err) throw err
            if(res.length < 1) {
                socket.emit('message-console', 'Commentaire non pris en charge')
            } else {
                io.in(data.room).emit('add-new-comment', data)
            }
        })
    })
})

//---------------------------------



server.listen(port, () => {
    console.log(`Listening on port ${port}, go to : http://${domain}:${port}/`)
})

