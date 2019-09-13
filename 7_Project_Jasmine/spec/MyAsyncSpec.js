
const utils = require("../index.js");

describe("/Async Op", function () {

    var  asyncOpCompleted  =  false;

    beforeEach(function (done) {
        utils.simulateAsyncOp(function(){
            asyncOpCompleted  =  true;
            done();
        });
    });
    it("should be able to tell if the async call has completed", function () {
        expect(asyncOpCompleted).toEqual(true);
    });

    it("should work with async/await", async () => {
        let  completed  =  false;
        completed  =  await  utils.simulateAsyncOpPromise();
        expect(completed).toEqual(true);
    });
});














