
var mongoose    = require('mongoose');
var log         = require('../lib/log')(module);
let db_url = process.env.MONGODB_URI;

// mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
    log.info('Connection Established')
})

mongoose.connection.on('reconnected', () => {
    log.info('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
    log.info('Connection Disconnected')
})

mongoose.connection.on('close', () => {
    log.info('Connection Closed')
})

mongoose.connection.on('error', (error) => {
    log.error('ERROR: ' + error)
})

const run = async () => {
    await mongoose.connect(db_url, {
        autoReconnect: true,
        reconnectTries: 1000000,
        reconnectInterval: 3000
    })
}

run().catch(error => console.error(error))

module.exports = mongoose;