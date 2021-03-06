'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jwt-simple'),
    cfg = require('../config')


exports.login = (req, res) => {
    if(req.body.username && req.body.password){
        User.findOne({username: req.body.username}, (err, user) => {
            if (err || !user) {
                res.status(401).send("Bad credentials")
            } else {
                if(req.body.password !== user.password) {
                    res.status(401).send("Wrong password")
                } else {
                    let payload = {
                        _id: user._id,
                        date: new Date()
                    }
                    let token = jwt.encode(payload, cfg.jwtSecret)
                    res.json({token: token})
                }
            }
        })
    } else {
        let missingParams = []
        if(!req.body.username) missingParams.push("username") 
        if(!req.body.password) missingParams.push("password") 
        res.status(400).send("No param: " + missingParams.toString().replace(',', ', ') + " in request body")

    }
    
}

exports.register = (req, res) => {
    if(req.body){
        let newUser = new User(req.body)
        newUser.save(req.body, (err, user) => {
            if(err) res.send(err)
            else res.json({"msg": "User " + user.username + " added succesful"})
        })
    } else {
        res.status(400).send("No params in request body")
    }
}

exports.profile = (req, res) => {
    let user = req.user
    user['password'] = undefined
    // delete user.password
    res.json(user)
}

exports.sugestUsers = (req, res) => {
    if(req.body.q) {
        User.find({username: {$regex: req.body.q, $options: "i"}}, (err, users) => {
            if(err) {
                res.status(400).send("Some error")
            } else if (!users){
                res.status(200).send({})
            } else {
                users = users.map(user => {
                    return { username: user.username, _id: user._id}
                    
                })
                res.json({users: users})
            }
        })
    } else {
        res.status(200).send([])
    }
}

exports.username = (req, res) => {
    if(req.body.id) {
        User.findById(req.body.id, (err, user) => {
            if(err) {
                res.status(400).send("Error")
            } else if (!user) {
                res.status0(200).send({error: "User not found"})
            } else {
                user["password"] = undefined
                user["createdDate"] = undefined
                user["__v"] = undefined

                res.json({user: user})
            }
        })
    }
}

exports.usernames = (req, res) => {
    console.log("here1")
    console.log(req.body)
    if(req.body.ids) {
        console.log("here")
        let users = []

        req.body.ids.forEach(id => {
            users.push(User.findById(id, (err, user) => {
                if(err) {
                    res.status(400).send("Error")
                } else if (!user) {
                    res.status0(200).send({error: "User not found"})
                } else {}
            }))
        })

        Promise.all(users).then(usersVals => {
            usersVals.forEach(user => {
                user["password"] = undefined
                user["createdDate"] = undefined
                user["__v"] = undefined
            })
            res.json(usersVals)
        }) 

        // console.log(users)
        
    }
}

exports.findUser = (req, res) => {
    if(req.body.username) {
        User.findOne({username: req.body.username}, (err, user) => {
            if(err) {
                res.status(400).send("Some error")
            } else if (!user){
                res.status(200).send({})
            } else {
                res.json({user: user})
            }
        })
    } else {
        res.status(200).send({})
    }
}