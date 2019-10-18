const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {

    let now = Date.now();

    let user;
    before((done) => {
        user = mod.User.create({
            name: "tester1", 
            email: "testEmail1",  
            pass: "test",
            taskIDs: []
        })
        .then(() => done()) 
    });

    it('creates a task', (done) => {
        request(app)
        .post('/createTask')
        .send({
                "title": "testTask1",
                "deadLine": now,
                "desc": "test_desc",
                "weight": 3,
                "category": "Work",
                "email": "testEmail1"
            
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1); //if task is saved to db it is not new

            mod.Task.findOne({ title: 'testTask1' }, function(error, task){
                assert(task.title === 'testTask1');
                done();
            })
        })

    });
});

after(async (done) => {

    done()
  })