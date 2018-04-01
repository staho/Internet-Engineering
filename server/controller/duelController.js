'use strict'

let mongoose = require('mongoose'),
    Duel = mongoose.model('Duel'),
    User = mongoose.model('User')


exports.newDuel = (req, res) => {
    let user1 = req.user 
    let user2 = req.body.user2
    User.findOne({username: user2}, (err, user2) => {
        if(err || !user2) {
            console.error(err)
            res.status(400).send("User doesn't exist")
        } else {
            let newDuel = new Duel({user1: user1._id, user2: user2._id})
            if(req.body.title) {
                newDuel.set('title', req.body.title)
            }

            newDuel.save().then(duel => {
                res.json({Msg: "Duel added successfully"})
            })
        }
    })
}

exports.getUserDuels = (req, res) => {

}

exports.updateDuel = (req, res) => {

}