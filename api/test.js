const bcrypt = require('bcrypt')
const saltRound = 10
const mdp = "luckyluckleboss" 
let hash = bcrypt.hashSync(mdp, saltRound)

console.log(hash)
