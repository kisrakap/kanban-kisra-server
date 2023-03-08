module.exports = function(err, req, res, next){
    console.log(err, "masuk ke error handlerrrr")
    let status = 500
    let errors = [] || "Internal Server Error"

    switch (err.name) {
        case 'SequelizeValidationError' :
            status = 400;
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            break
            
        case 'JsonWebTokenError':
            status = 401;
            errors.push(err.message)
            break
        
        case 'SequelizeUniqueConstraintError':
            status = 400
            errors.push(err.errors[0].message)
            break
            
        default: 
        errors.push(err.msg || "Internal Server Error")
        status = err.status || status
    }
    res.status(status).json({ errors })
}