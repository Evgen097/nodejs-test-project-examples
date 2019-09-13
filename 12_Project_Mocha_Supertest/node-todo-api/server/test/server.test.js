
const expect = require('expect')
const request = require('supertest')
const {ObjectId} = require('mongodb')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
}]

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe('POST /todos', () => { // 1

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done())
    })

    it('should create a new todo', (done) => {
        let text = 'Test todo text' // 2

        request(app) // 3
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => { // 4
                if (err) {
                    return done(err)
                }

                Todo.find({text}).then((todos) => { // 5
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should not create todo with invalid body data', (done) => { // 6

        request(app) // 7
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then((todos) => { // 8
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })
})

describe('GET /todos/:id', () => {

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done())
    })

    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('should return 404 if todo is not found', (done) => {
        let _id = new ObjectId('5967989ee978311656e93a59')
        request(app)
            .get(`/todos/${todos/_id.toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        let hexId = '5967989ee978311656e93a5312'
        request(app)
            .get(`/todos/${todos/hexId}`)
            .expect(404)
            .end(done)
    })
})


describe('DELETE /todos/:id', () => {

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done())
    })


    it('should delete a todo', (done) => {
        let hexId = todos[0]._id.toHexString() // 1
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => { // 2
                if (err) {
                    return done(err)
                }
            })

        Todo.findById(hexId).then((todo) => { // 3
            expect(todo.hexId).toNotExist()
            done()
        }).catch((e) => done(e))
    })

    it('should return 404 if todo is not found', (done) => {
        let hexId = new ObjectId().toHexString()
        request(app)
            .delete(`/todos/${todos/hexId}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done)
    })

})
