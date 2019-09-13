
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


describe('PUT /articles/id', function () {
    this.timeout(5000);

    beforeEach((done)=>{
        ArticleModel.deleteMany({})
            .then(()=> ArticleModel.insertMany(articles))
            .then(()=> done());
    });
    it('shoul get all articles', done=>{

        let article = articles[0];
        let new_title = 'New title'
        article.title = new_title;
        request(app)
            .put('/api/articles/' + article._id)
            .send(article)
            .expect(200)
            .expect(res=> {
                expect(res.body.data.title).toBe(new_title)
            })
            .end(done)
    })
})











