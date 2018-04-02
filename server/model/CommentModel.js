let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let CommentSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Comment', CommentSchema)