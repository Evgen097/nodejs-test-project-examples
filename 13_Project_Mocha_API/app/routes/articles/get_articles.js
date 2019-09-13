
var log             = require('../../lib/log')(module);
var ArticleModel    = require('../../db/schema/article');
let api_responce = require('../../lib/api_response')

let get_articles = (req, res) => {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            let responce = api_responce({data: articles, msg: "All articless found"});
            return res.send(responce);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            let responce = api_responce(
                {error: 'Server error', msg: "Error in db, while looking articles!"});
            return res.send(responce);
        }
    });
};

module.exports = get_articles;










