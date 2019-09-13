
var mongoose    = require('mongoose');

let Images = require('./images');

// Schemas
var Schema = mongoose.Schema;

var Article = new Schema({
    _id: {},
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});

// validation
Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var ArticleModel = mongoose.model('Article', Article);

module.exports = ArticleModel;










