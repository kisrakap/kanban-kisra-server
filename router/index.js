let router = require('express').Router()
let user = require('./user')
let task = require('./task')

router.use('/', user)
router.use('/tasks', task)
module.exports = router