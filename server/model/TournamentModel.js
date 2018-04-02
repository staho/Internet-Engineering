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
    creator: {
        type: Schema.ObjectId,
        required: true,
        ref: "User"
    },
    users: {
        type: [{
            type: Schema.ObjectId,
            ref: "User"
        }],
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
    state: {
        type: String,
        enum: ["CREATED", "IN_PROGRESS", "CLOSED"],
        required: true,
        default: "CREATED"
    },
    ladder: {
        type: [{
            type: Schema.ObjectId,
            ref: 'Duel'
        }],
        required: true
     },
    comments: [{
        type: Schema.ObjectId,
        ref: "Comment"
    }],

})

// TournamentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Tournament', TournamentSchema)