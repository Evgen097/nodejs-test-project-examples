
var log             = require('../../lib/log')(module);
var ArticleModel    = require('../../db/schema/article');
let api_responce = require('../../lib/api_response');
var ObjectID = require('mongodb').ObjectID;

let delete_article = (req, res) => {

    return ArticleModel.findOne( new ObjectID(req.params.id), function (err, article) {
        if(!article) {
            res.statusCode = 404;
            let responce = api_responce(
                { error: 'Not found', msg: "Error while deleting!"});
            return res.send(responce);
        }

        return article.remove(function (err) {
            if (!err) {
                log.info("article removed");
                res.statusCode = 200;
                let responce = api_responce(
                    {msg: `Article ${article._id} successfully deleted!`});
                return res.send(responce);
            } else {
                res.statusCode = 500;
                // log.error('Internal error(%d): %s',res.statusCode,err.message);
                let responce = api_responce(
                    { error: 'Server error',
                      msg: 'Internal error(%d): %s' + res.statusCode + err.message});
                return res.send(responce);
            }
        });
    });
};

module.exports = delete_article;











