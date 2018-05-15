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
                res.json({msg: "Duel added successfully", success: true})
            })
        }
    })
}

exports.getUserDuels = (req, res) => {
    Duel.find({$or: [{user1: req.user}, {user2: req.user}]}, 
        (err, duelList) => {
            if(err || !duelList) {
                res.status(400).send("No duels or user error")
            } else {
                res.json(duelList)
            }
    })
}

exports.updateDuel = (req, res) => {
    let updatedDuel = req.body


    if(updatedDuel.state) {
        let verificationStatus = false
        let avaliableStates = Duel.schema.path('state').enumValues
        avaliableStates.forEach(element => {
            if(element === updatedDuel.state) verificationStatus = true
        })
        
        if(!verificationStatus) {
            res.status(400).send({error: "Wrong state", validStates: avaliableStates})
            return
        }
    }

    if(updatedDuel.result.winner) {
        res.status(400).send({error: "Winner is chosen by score values"})
        return
    }

    if(updatedDuel.result && updatedDuel.result.score) {
        let score = updatedDuel.result.score
        if(score.hasOwnProperty('user1') && score.hasOwnProperty('user2')){
            if(score.user1 + score.user2 > 3) {
                res.status(400).send({error: "Score sum is above 3"})
                return
            }
            if(score.user1 > score.user2) {
                updatedDuel.result.winner = "user1"
            } else {
                updatedDuel.result.winner = "user2"
            }
    
            updatedDuel.state = "CLOSED"
            console.log(updatedDuel.result.score)
        } else {
            res.status(400).send({error: "No scores"})
            return
        }
        
    }


    Duel.findByIdAndUpdate({_id: updatedDuel._id}, updatedDuel, {new: true}, (err, duel) => {
        if(err || !duel) {
            res.status(400).send("ERROR")
        } else {
            res.json(duel)
        }
        console.log(duel)
    })
}