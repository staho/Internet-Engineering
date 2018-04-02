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
        enum: ['CREATED', 'PLAYING', 'CLOSED'],
        default: 'CREATED'
    },
    result: {
        winner: { 
            type: String,
            enum: ["user1", "user2"]
        },
        score: {
            user1: Number,
            user2: Number
        }
    },
    tournamentDuel: {
        type: Boolean,
        required: true,
        default: false
    },
    _version: {
        type: Number,
        default: 1
    },
    comments: {
        type: [Schema.ObjectId],
        ref: 'Comment'
    }
}, {strict: true})

module.exports = mongoose.model('Duel', DuelSchema)