let {User} = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next){
 let access_token = req.headers.access_token

 try {
    if(!access_token) throw {msg: 'Token not found', status: 401}
    else {
        let decoded = verifyToken(access_token)
        let user = await User.findOne({where: {email: decoded.email}})
        if (!user) throw {msg: "Authentication failed", status: 400}
        else {
            req.userData = decoded
            next()
        }
    } 
 } 
 catch (err) {
     next(err)
 }
}

module.exports = authentication