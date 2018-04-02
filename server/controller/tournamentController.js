'use strict'
let mongoose = require('mongoose'),
    Duel = mongoose.model('Duel'),
    User = mongoose.model('User'),
    Tournament = mongoose.model('Tournament')

exports.allTournaments = () => {

}

exports.createTournament = (req, res) => {
    if(req.body.usernames) {
        let newTournament = Object.assign({}, req.body)

        newTournament.creator = req.user._id

        User.find()
            .where("username")
            .in(newTournament.usernames)
            .exec((err, records) => {
                if(err || !records || records.length !== req.body.usernames.length){

                    let diffs = newTournament.usernames.filter(o1 => records.filter(o2 => o2.username === o1).length === 0);
                    
                    res.status(400).send({
                        msg: "Couldn't find usernames in database",
                        unrecognisedUsernames: diffs
                    })
                } else {
                    newTournament.users = records.map(element => { return element._id})

                    if(newTournament.users.length % 2 === 0) {

                    } else {
                        //this guy should play dwo duels
                        let randomUser = newTournament.users[Math.floor(Math.random() * newTournament.users.length)]
                        
                    }

                }
                console.log(newTournament)
            })

    }

}

exports.updateTournament = () => {
    
}