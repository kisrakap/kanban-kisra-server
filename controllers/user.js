let {User} = require('../models')
let jwt = require('../helpers/jwt')
let bcrypt = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library')

class Usercontroller{
    static register(req, res, next){
        let { username, email, password } = req.body
       
        User.create({email, username, password})
        .then(data =>{
            res.status(201).json({id : data.id, email: data.email, username: data.username})
        })
        .catch( err =>{
         next(err)
         })
    }

    static login(req, res, next){
        let { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(founduser =>{
            if (!founduser) throw {msg: `Error! Email & Password are Wrong`, status: 404}
            let cekpassword = bcrypt.compare(password, founduser.password)
            console.log(cekpassword, '<-------------------------');
            if (cekpassword){
                let access_token = jwt.generateToken({id: founduser.id, username: founduser.username, email: founduser.email})
                console.log(access_token);
                res.status(200).json({id: founduser.id, username: founduser.username, email: founduser.email, access_token: `${access_token}`})
            }
            else{
                throw {msg: "Error! Email & Password are Wrong", status:404 }
            }
        })
        .catch(err =>{
            next(err) 
     })
    }

    static googlelogin(req, res, next){
        console.log("masuk sini ?");
        const { id_token } = req.body
        console.log(id_token, "dari body");
        let user = null;
        const client = new OAuth2Client(`245291727558-vofc4itller4qprc8d0rtsmgpc4d6vhj.apps.googleusercontent.com`);
        client.verifyIdToken({
            idToken: id_token,
            audience: `245291727558-vofc4itller4qprc8d0rtsmgpc4d6vhj.apps.googleusercontent.com`,
        })
            .then(ticket => {
                user = ticket.getPayload()
                
                return User.findOne({
                    where: { email: user.email }
                })
            })
            .then(foundUser => {
                console.log(foundUser, "==========");
                if (foundUser) return foundUser
                else {
                    return User.create({
                        email: user.email,
                        password: `${user.email}5`,
                        username: user.name
                    })
                }
            }).then(foundUser => {
                console.log(foundUser, `<<<<<<<<<<<<<<<<`)
                const access_token = jwt.generateToken({id: foundUser.id, email: foundUser.email})
                res.status(200).json({id: foundUser.id, username: foundUser.username, email: foundUser.email, access_token: `${access_token}`})
            }).catch(err => {
                console.log(err);
                next(err)
            })
    }

}
module.exports = Usercontroller