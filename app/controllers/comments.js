let db = require('../models');
let moment = require('moment');

module.exports = function (app) {

    app.get('/comments/:id', function (req, res) {

        db.Article.find({
                "_id": req.params.id
            })
            .populate("comments")
            .then(function (dbArticle) {
                res.render('comment', {
                    data: dbArticle[0]
                })
            })
            .catch(function (err) {
                res.json(err);
            })

    });

    app.post('/comments/:id', function (req, res) {

        db.Comment
            .create({
                "text": req.body.comment,
                "created_date": req.body.created_date
            })
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $push: {
                        comments: dbComment._id
                    }
                }, {
                    new: true
                });
            })
            .then(function (dbArticle) {
                console.log("success!");
            })
            .catch(function (err) {
                res.json(err);
            })

    });

}