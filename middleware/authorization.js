let {Task} = require('../models')

function authorization(req, res, next){
    let id = req.params.id

    Task.findByPk(id)
    .then( data =>{
        if (!data) throw {msg: "Task not found auto", status: 400}
        else if (data.UserId === req.userData.id) next()
        else throw {msg: "You're not authorize to do this", status: 403}
    })
    .catch( err =>{
        next(err)
    })
}

module.exports = authorization