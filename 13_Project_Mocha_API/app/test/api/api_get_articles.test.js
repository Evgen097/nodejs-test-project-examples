
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


describe('GET /articles', ()=>{

    beforeEach((done)=>{
        ArticleModel.deleteMany({})
            .then(()=>{
                ArticleModel.insertMany(articles)
            })
            .then(()=> done())
    });

    it('shoul get all articles', done=>{
        request(app)
            .get('/api/articles')
            .expect(200)
            .expect(res=> {
                expect(res.body.data.length).toBe(2);
                expect(res.body.data[0]._id).toBe(articles[0]._id.toString());
                expect(res.body.data[1]._id).toBe(articles[1]._id.toString());
                expect(res.body.data[0].title).toBe(articles[0].title);
                expect(res.body.data[1].title).toBe(articles[1].title);
            })
            .end(done)
    })
})


describe('GET /articles/id', ()=>{

    beforeEach((done)=>{
        ArticleModel.deleteMany({})
            .then(()=>ArticleModel.insertMany(articles))
            .then(()=> done())
    });

    it('should get one articles this id', done=>{
        let article = articles[0];
        request(app)
            .get('/api/articles/' + article._id)
            .expect(200)
            .expect(res=> {
                expect(res.body.data._id).toBe(article._id.toString());
                expect(res.body.data.title).toBe(article.title);
            })
            .end(done)
    })

    it('should return 404 if article is not found', (done) => {
        let _id = new ObjectId('5967989ee978311656e93a59')
        request(app)
            .get('/api/articles/' + _id)
            .expect(404)
            .end(done)
    })

    it('should return 500 for non-object ids', (done) => {
        let hexId = '5967989ee978311656e93a5312'
        request(app)
            .get('/api/articles/'+hexId)
            .expect(500)
            .end(done)
    })

})










