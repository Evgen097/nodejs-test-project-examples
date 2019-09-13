
var log             = require('../../lib/log')(module);
var ArticleModel    = require('../../db/schema/article');
let api_responce = require('../../lib/api_response');
var ObjectID = require('mongodb').ObjectID;

let get_articles_by_id = (req, res) => {

    return ArticleModel.findOne(new ObjectID(req.params.id), function (err, article) {
        if (!err) {
            if(article=== null){
                res.statusCode = 404;
                let responce = api_responce(
                    {error: 'NOT found!', msg: `Article id ${req.params.id} not found!`});
                return res.send(responce);
            }
            let responce = api_responce(
                {data: article, msg: `Article id ${req.params.id} found!`});
            return res.send(responce);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            let responce = api_responce(
                {error: 'Server error', msg: "Error in db, while looking for article!"});
            return res.send(responce);
        }
    });
};

module.exports = get_articles_by_id;










