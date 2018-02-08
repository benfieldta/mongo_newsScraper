const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: false
    },

    dateScraped: {
        type: String
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;