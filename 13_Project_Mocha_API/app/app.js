
let config = require('./config/config')
var express         = require('express');
var path            = require('path'); // модуль для парсинга пути
var bodyParser = require('body-parser')
var log             = require('./lib/log')(module);
var app = express();
let port = process.env.PORT;
let db = require('./db')

app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let articles_route = require('./routes')



app.get('/api', function (req, res) {
    res.send('API is running');
});

app.use('/api/articles', articles_route)


// app.get('/api/articles', function(req, res) {
//     res.send('This is not implemented now');
// });

// app.post('/api/articles', function(req, res) {
//     res.send('This is not implemented now');
// });
//
// app.get('/api/articles/:id', function(req, res) {
//     res.send('This is not implemented now');
// });
//
// app.put('/api/articles/:id', function (req, res){
//     res.send('This is not implemented now');
// });
//
// app.delete('/api/articles/:id', function (req, res){
//     res.send('This is not implemented now');
// });

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

if(module.parent) module.exports = app;
else app.listen(port, ()=> log.info('Express server listening on port ' + port));








