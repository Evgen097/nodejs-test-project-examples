
const expect = require('expect')
const request = require('supertest')
let app = require('../../app');
const {ObjectId} = require('mongodb')
let ArticleModel    = require('../../db/schema/article');


let articles = [
    {
        _id: new ObjectId(),
        title: 'TestArticle_1',
        author: 'Djoan Rouling',
        description: 'Very interesting book',
        images: [{"kind":"thumbnail", "url":"http://picsum.photos/536/354"},{"kind":"detail", "url":"http://picsum.photos/200/300/?blur"}]
    },
    {
        _id: new ObjectId(),
        title: 'TestArticle_2',
        author: 'Michail Boolckagov',
        description: 'Russian book',
        images: [{"kind":"thumbnail", "url":"http://picsum.photos/536/354"},
            {"kind":"detail", "url":"http://picsum.photos/200/300/?blur"}]
    }
];


describe('DELETE /articles/id', function(){
    this.timeout(5000);

    beforeEach((done)=>{
        // ArticleModel.insertMany(articles).then(()=> done())
        ArticleModel.deleteMany({})
            .then(()=>{
                return ArticleModel.insertMany(articles)
            })
            .then(()=> done())
    });


    it('should delete article on id', function(done){

        let article = articles[0];
        request(app)
            .delete('/api/articles/'+article._id)
            .expect(200)
            .expect(res=> {
                expect(res.body.error).toBe(null);
                expect(res.body.msg).toBe(`Article ${article._id} successfully deleted!`);
            })
            .end((err, res) => { // 2
                if (err) {return done(err)}
                ArticleModel.findById(article._id).then((data) => { // 3
                    expect(data).toBe(null)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should return 404 if article is not found', (done) => {
        let _id = new ObjectId().toHexString()
        request(app)
            .delete('/api/articles/'+_id)
            .expect(404)
            .expect(res=> {
                expect(res.body.error).toBe('Not found');
                expect(res.body.msg).toBe("Error while deleting!");
            })
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .delete('/api/articles/'+'5d79d39eba4a7d2368f90e4777')
            .expect(500)
            .expect(res=> {
                expect(res.body.error).toBe(`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`);
            })
            .end((err, res) => { // 2
                if (err) {return done(err)}

                done()
            })
    })
})












