
const utils = require("../index.js");

describe("Math Utils", function() {

    describe("Basic Math Utils", function() {

        it("should be able to tell if a number is even",function() {
            expect(utils.isEven).toBeDefined();
            expect(utils.isEven(2)).toBeTruthy();
            expect(utils.isEven(1)).toBeFalsy();
        });

        it("should be able to tell if a number is odd",function() {
            expect().nothing();
        });

    });

    describe("Advanced Math Utils", function() {
        it("should be able to tell if a number is prime",function() {
            expect().nothing();
        });
        it("should be able to calculate the fibonacci of a number",function() {
            expect().nothing();
        });
    });

});











