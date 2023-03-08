let jwt = require('jsonwebtoken')
let secret = "rahasia"

function generateToken(payload){
    return jwt.sign(payload, secret)
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

module.exports = {generateToken, verifyToken}
