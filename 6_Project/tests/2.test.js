
let request = require('supertest')
let app = require('../app/app');
let should = require('should')

describe('GET /', function () {
    it('should contain text "Hello, Express!"', function (done) {
        request(app)
            .get('/')
            .expect(/Hello, Express!/, done)
    })
})