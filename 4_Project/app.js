
const express = require("express");
var app = express();

app.get("/", function (request, response){
    setTimeout(()=>{
        response.send("Hello Test");
    }, 1000)
});

app.get("/error", function (request, response){
    response.status(404).send("NotFound");
});
app.get("/user", function (request, response){
    response.send({name:"Tom", age: 22});
});


if(module.parent!==null) module.exports.app = app;
else app.listen(3000);













