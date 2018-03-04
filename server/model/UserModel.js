'use strict'
let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator')

let UserSchema = new Schema({
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    }, 
    createdDate: {
        type: 'Date',
        required: true,
        default: Date.now(),
    }
})

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema)