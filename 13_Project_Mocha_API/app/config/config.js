
let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 8081;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/article_db'
} else if (env === 'test') {
    process.env.PORT = 8080;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/article_test'
}else{
    process.env.PORT = 8080;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/article_test'
}

let meta = {
    "port" : 1337,
    "security": {
        "tokenLife" : 3600
    },
    "mongoose": {
        "uri": process.env.MONGODB_URI
    }
}
module.exports  = meta;












