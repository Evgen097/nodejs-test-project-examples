var Calculator = function() {}

Calculator.prototype.add = function(a,b) {
    return a + b;
}

Calculator.prototype.subtract = function(a,b) {
    return a - b;
}

Calculator.prototype.multiply = function(a,b) {
    return a * b;
}

module.exports = new Calculator();





