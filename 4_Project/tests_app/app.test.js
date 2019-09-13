const request = require("supertest");
const assert = require("assert");

var app = require("../app").app;

describe("Express Tests", function(){
    it("should return Hello Test", function(done){

        request(app)
            .get("/")
            .expect("Hello Test")
            .end(done);
    });

    it("should return NotFound with status 404", function(done){

        request(app)
            .get("/error")
            .expect(404)
            .expect("NotFound")
            .end(done);
    });

    it("should return user with name Tom and age 22", function(done){

        request(app)
            .get("/user")
            .expect(function(response){
                assert.deepEqual(response.body, {name:"Tom", age:22});
            })
            .end(done);
    });
});








