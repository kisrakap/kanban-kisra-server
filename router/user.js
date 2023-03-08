let router = require('express').Router()
let Usercontroller = require('../controllers/user')

router.post('/register', Usercontroller.register)
router.post('/login', Usercontroller.login)
router.post('/googlelogin', Usercontroller.googlelogin)
module.exports = router