let router = require('express').Router()
let Taskcontroller = require('../controllers/task')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', Taskcontroller.findAll)
router.post('/', Taskcontroller.create)
router.get('/:id', authorization, Taskcontroller.findById)
router.put('/:id', authorization, Taskcontroller.update)
router.delete('/:id', authorization, Taskcontroller.delete)

module.exports = router