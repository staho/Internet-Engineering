'use strict'
let mongoose = require('mongoose'),
    Duel = mongoose.model('Duel'),
    User = mongoose.model('User'),
    Tournament = mongoose.model('Tournament')

exports.allTournaments = () => {

}

exports.createTournament = (req, res) => {
    if(req.body.usernames) {
        let newTournament = Object.assign({}, req.body),
            duels = []

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
                    records = arrayShuffle(records)
                    if(records.length % 2 === 0) {

                        for(let i = 0; i < records.length; i += 2) {
                            duels[duels.length] = new Duel({
                                user1: records[i]._id,
                                user2: records[i + 1]._id,
                                tournamentDuel: true 
                            })
                        }
                       
                    } else {
                        //this guy should play dwo duels
                        records[records.length] = records[Math.floor(Math.random() * records.length)]
                        if(records[records.length - 1]._id === records[records.length - 2]._id) {
                            let temp = records[0]
                            records[0] = records[records.length - 1]
                            records[records.length - 1] = temp
                        }


                        for(let i = 0; i < records.length; i += 2) {
                            duels[duels.length] = new Duel({
                                user1: records[i]._id,
                                user2: records[i + 1]._id,
                                tournamentDuel: true 
                            })
                        }
                        
                    }

                    let dbDuels = duels.map(duel => new Duel(duel).save())
                    Promise.all(dbDuels).then(duels => {
                        newTournament.ladder = [duels]

                        Tournament(newTournament).save().then(tournament => {
                            res.json({tournament})
                        })
                    })

                    
                }
            })       

    }

}

exports.updateTournament = () => {
    
}

let arrayShuffle = array => {
    let m = array.length, t, i;
    
    while (m) {
    
        i = Math.floor(Math.random() * m--);
    
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
    
}