
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


describe('POST /articles', ()=>{

    beforeEach((done)=>{
        ArticleModel.deleteMany({})
            .then(()=> done())
    });
    it('should create new article', done=>{
        let article = articles[0];
        request(app)
            .post('/api/articles')
            .send(article)
            .expect(200)
            .expect(res=> {
                expect(res.body.data._id).toBe(article._id.toString())
                expect(res.body.data.title).toBe(article.title)
            })
            .end((err, res) => {
                if (err) {return done(err)}
                ArticleModel.findOne({_id: article._id}).then((data) => {
                    expect(data._id.toString()).toBe(article._id.toString())
                    expect(data.title).toBe(article.title)
                    done()
                }).catch((e) => done(e))
            })
    });

    it('should not create article this invalid data', done=>{
        let article = articles[1];
        article.title = '';
        request(app)
            .post('/api/articles')
            .send(article)
            .expect(400)
            .expect(res=> {
                expect(res.body.error).toBe("Validation error")
                expect(res.body.msg).toBe("Article not saved!")
            })
            .end((err, res) => {
                if (err) {return done(err)}
                ArticleModel.findOne({_id: article._id}).then((data) => {
                    expect(data).toBe(null);
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should return 500 for non-object ids', (done) => {

        let article = articles[1];
        article._id = '5967989ee978311656e93a5312111';

        request(app)
            .post('/api/articles')
            .send(article)
            .expect(400)
            .expect(res=> {
                expect(res.body.error).toBe("Validation error")
                expect(res.body.msg).toBe("Article not saved!")
            })
            .end((err, res) => {
                if (err) {return done(err)}
                ArticleModel.findOne({_id: article._id}).then((data) => {
                    expect(data).toBe(null);
                    done()
                }).catch((e) => done(e))
            })




        request(app)
            .get('/api/articles/'+hexId)
            .expect(500)
            .end(done)
    })

})











