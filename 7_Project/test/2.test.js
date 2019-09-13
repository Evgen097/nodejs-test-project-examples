
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("SAMPLE unit test",function(){



    it("should add two number",function(done){

        //calling ADD api
        server
            .post('/add')
            .send({num1 : 10, num2 : 20})
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                res.body.data.should.equal(30);
                done();
            });
    });

    it("should return 404",function(done){
        server
            .get("/random")
            .expect(404)
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    })
});












