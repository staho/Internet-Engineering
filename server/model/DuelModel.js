'use strict'
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator')

let DuelSchema = new Schema({
    user1: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    user2: {
        type: Schema.ObjectId,
        required: false,
        ref: 'User'
    }, 
    title: String,
    createdDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    finishedDate: Date,
    state: {
        type: String,
        enum: ['CREATED', 'PLAYING', 'FINISHED'],
        default: 'CREATED'
    },
    result: {
        userWinner: String,
        score: {
            1: Number,
            2: Number
        }
    },
    tournamentDuel: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Duel', DuelSchema)