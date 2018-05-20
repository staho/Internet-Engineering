let fs = require('fs')

exports.isAvatarAvailalble = (req, res, next) => {
    
    // console.log(req, res, next)

    if(req.path.indexOf('avatars') > 0){
        if(fs.existsSync(`${__dirname}/../public${req.path}`)) {
            res.sendFile(`/public${req.path}`, {root: `${__dirname}/..`})
        } else {
            res.sendFile(`/public/avatars/default.png`, {root: `${__dirname}/..`})
        }
        
    }
    next()
}