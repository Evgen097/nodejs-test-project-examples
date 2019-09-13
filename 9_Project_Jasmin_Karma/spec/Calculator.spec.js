describe('Calculator', function(){
    var calculator = require('../calculator');

    beforeAll(function(){
        console.log("runs only once before everything.")
    })

    afterAll(function(){
        console.log("runs only once after everything.")
    })

    beforeEach(function(){
        console.log("running before each spec!!!!")
    })

    afterEach(function(){
        console.log("running after each spec!!!!")
    })



    it('Should add two numbers', function(){
        var result = calculator.add(4,5);

        expect(result).toBe(9);
    })

    it('Should Subtract two numbers', function(){
        var result = calculator.subtract(10,5);

        expect(result).toBe(5);
    })

    it('Should Multiply two numbers', function(){
        var result = calculator.multiply(10,5);

        expect(result).toBe(50);
    })
})