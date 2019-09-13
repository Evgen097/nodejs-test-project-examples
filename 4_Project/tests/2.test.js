var assert = require("assert");
var operations = require("../operations");

describe("Operation Tests", function(){
    it("should multiply two numbers", function(){

        var expected = 15;
        var result = operations.multiply(3, 5);
        assert.equal(result, expected);
    });
    it("should add two numbers", function(){

        var expected = 16;
        var result = operations.add(9, 7);
        assert.equal(result, expected);
    });
});