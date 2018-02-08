const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },

    created_date: {
        type: String
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;