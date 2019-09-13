
var express         = require('express');

let router = express.Router();
let get_articles= require('./articles/get_articles');
let post_articles = require('./articles/post_articles');
let put_articles = require('./articles/put_articles');
let delete_articles = require('./articles/delete_articles');
let get_articles_by_id = require('./articles/get_articles_by_id');


router.get('/:id', get_articles_by_id);
router.get('/', get_articles);
router.post('/', post_articles);
router.put('/:id', put_articles);
router.delete('/:id', delete_articles);

// / define the home page route
// router.get('/', function(req, res) {
//     res.send('Birds home page');
// });
// // define the about route
// router.get('/about', function(req, res) {
//     res.send('About birds');
// });
//
// var birds = require('./birds');
// ...
// app.use('/birds', birds);

module.exports = router;




