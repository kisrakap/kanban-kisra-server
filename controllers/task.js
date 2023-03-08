let {Task, User} = require('../models')

class Taskcontroller{
    static findAll(req, res, next){
        let UserId = req.userData.id
        Task.findAll({ include: { model: User }})
        .then(data =>{
            if(!data){
                throw {status: 404, msg: 'error not found'}
            }
            res.status(200).json({task: data})
        })
        .catch(err =>{     
            next(err)
        })
    }

    static create(req, res, next){
        let {title, category, detail } = req.body
        let UserId = req.userData.id

        Task.create({title, category, detail, UserId })
        .then( data => {
            res.status(201).json({data})
        })
        .catch( err =>{
            next(err)
        })
    }

    static findById(req, res, next){
        let id = req.params.id

        Task.findByPk(id)
        .then( data =>{
            if (!data){
                throw {status: 404, msg: "error not found"}
            } 
            else {
                res.status(200).json({data})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        let {title, category, detail} = req.body;
        let task = {title, category, detail }
       
        Task.update(task, {where: {id}, returning: true})
        .then (data =>{
            res.status(201).json({data})
        })
        .catch (err => {
            next(err)
         })
    }

    static delete(req, res, next){
       let id = req.params.id 
        Task.destroy({where : {id}, returning: true})
        .then(data => {
            console.log(data);
            res.status(200).json({msg:` data with id: ${id} is deleted`})
        })
        .catch(err =>{
            next(err)
         })
    }
}
module.exports = Taskcontroller