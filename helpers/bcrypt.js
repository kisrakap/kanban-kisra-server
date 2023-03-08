let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10)

function hash(password){
    return bcrypt.hashSync(password, salt)
}

function compare(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hash, compare
}
