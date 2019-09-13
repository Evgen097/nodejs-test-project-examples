
let should = require('should')


describe('Truth', function () {
    it('should be true', function () {
        true.should.be.true
    })

    it('should not be false', function () {
        true.should.not.be.false
    })
})

describe('foo variable', function () {
    it('should equal bar', function () {
        var foo = 'bar'
        foo.should.equal('bar')
    })
})








