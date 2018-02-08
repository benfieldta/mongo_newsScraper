let db = require('../models');
let cheerio = require('cheerio');
let request = require('request');
let moment = require('moment');

module.exports = function (app) {

    app.get('/', function (req, res) {

        db.Article
            .find({}, null, {
                sort: {
                    dateScraped: -1
                }
            })
            .then(function (dbArticle) {
                res.render('index', {
                    data: dbArticle
                });
            })
    })

    app.post('/', function (req, res) {

        request('https://news.ycombinator.com/', function (error, response, body) {
            if (error) throw error;

            let $ = cheerio.load(body);
            let today = moment().format("YYYY-MM-DD");

            $(".storylink").each(function (i, element) {

                if (i < 10) {
                    let results = {
                        "title": $(this).text(),
                        "link": element.attribs.href,
                        "dateScraped": today
                    }

                    db.Article
                        .create(results)
                        .then(function (dbArticle) {
                            console.log("Saved article in Mongodb!");
                        })
                        .catch(function (err) {
                            console.log("An error occurred attempting to save the article.")
                        })
                }

            })
            res.redirect('back');
        })

    })

    app.post('/delete', function (req, res) {

        console.log(req.body.id);

        if (req.body.id) {
            db.Article
                .remove({
                    _id: req.body.id
                })
                .then(function () {
                    res.redirect('back')
                })
        } else {
            db.Article
                .remove({})
                .then(function () {
                    res.redirect('back');
                })
        }

    })

}