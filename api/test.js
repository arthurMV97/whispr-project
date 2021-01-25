const bcrypt = require('bcrypt')
const saltRound = 10
const mdp = "arthurleboss" 
let hash = bcrypt.hashSync(mdp, saltRound)

console.log(hash)
