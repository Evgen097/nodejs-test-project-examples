
var log             = require('../../lib/log')(module);
var ArticleModel    = require('../../db/schema/article');
let api_responce = require('../../lib/api_response')
var ObjectID = require('mongodb').ObjectID;

let get_article = (req, res) => {

    var article = new ArticleModel({
        _id:  new ObjectID(req.body._id),
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save(function (err) {
        if (!err) {
            log.info("article created");
            res.statusCode = 200;
            let responce = api_responce(
                {msg: "Article successefuly saved!", data: article});
            return res.send(responce);
        } else {
            // console.log(err);
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                let responce = api_responce(
                    { error: 'Validation error', msg: "Article not saved!" });
                // console.log('responce')
                // console.log(responce)
                return res.send(responce);
            } else {
                res.statusCode = 500;
                let responce = api_responce(
                    { error: 'Server error', msg: "Article not saved!"});
                return res.send(responce);
            }

        }
    });
};

module.exports = get_article;










