
var log             = require('../../lib/log')(module);
var ArticleModel    = require('../../db/schema/article');
let api_responce = require('../../lib/api_response')
var ObjectID = require('mongodb').ObjectID;

let put_article = (req, res) => {

    return ArticleModel.findById(new ObjectID(req.params.id), function (err, article) {
        if(!article) {
            res.statusCode = 404;
            let responce = api_responce(
                { error: 'Not found', msg: `Article id ${req.params.id} not found!`});
            return res.send(responce);
        }

        Object.keys(req.body).forEach(key => article[key] = req.body[key] || article[key]);
        article._id = new ObjectID(article._id)
        return article.save(function (err) {
            if (!err) {
                log.info("article updated");
                res.statusCode = 200;
                let responce = api_responce(
                    { data: article, msg: `Article id ${req.params.id} not updated!`});
                return res.send(responce);

            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
};

module.exports = put_article;










