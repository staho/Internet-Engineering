'use strict'
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator')

let TournamentSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    users: {
        type: [String],
        required: true
    }, 
    createdDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    expires: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: "Started"
    },
    ladder: [{
        type: Schema.ObjectId,
        ref: 'Duel'
    }]

})

TournamentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Tournament', TournamentSchema)