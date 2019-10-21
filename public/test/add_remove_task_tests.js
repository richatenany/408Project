const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {

    var date = Date.now();
    var invalidDate = new Date();
    invalidDate.setDate(invalidDate.getDate() - 1);

    it('creates a task', (done) => {
        request(app)
        .post('/createTask')
        .send({
                "title": "testTask1",
                "date": date.toString(),
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

    it('validate deadline date', (done) => {
        request(app)
        .post('/createTask')
        .send({
            "title": "testTask_invalidDeadline",
            "date": invalidDate.toString(),
            "desc": "test_desc",
            "weight": 3,
            "category": "Work",
            "email": "testEmail1"
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 0);
            assert(JSON.parse(res.text).message === "Invalid deadline: must be after current date");
            done();
        })
    })

    it('validate weight', (done) => {
        request(app)
        .post('/createTask')
        .send({
            "title": "testTask_invalidWeight",
            "date": date.toString(),
            "desc": "test_desc",
            "weight": -1,
            "category": "Work",
            "email": "testEmail1"
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 0);
            assert(JSON.parse(res.text).message === "Invalid weight: task weights must be postive.");
            done();
        })
    })

    it('no duplicate task titles', (done) => {
        request(app)
        .post('/createTask')
        .send({
            "title": "testTask1",
            "date": date.toString(),
            "desc": "test_desc",
            "weight": 5,
            "category": "Work",
            "email": "testEmail1"
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 0);
            assert(JSON.parse(res.text).message === "Task titles must be unique");
            done();
        })
    })

    var idToRemove = 0; //Need to store id to remove for next test...

    it('check user\'s taskIDs array after add task', (done) => {
        request(app)
        .post('/createTask')
        .send({
            "title": "testTask2",
            "date": date.toString(),
            "desc": "testTask2_desc",
            "weight": 5,
            "category": "Work",
            "email": "testEmail1"
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1); 
            mod.Task.findOne({ title: 'testTask1' }, function(error, task){
                assert(task.title === 'testTask1');
                idToRemove = task._id;
            })
            mod.User.findOne({email: 'testEmail1' }, function(error, user){
                assert(user.taskIDs.length == 2);
            })
            done();
        })
    })

    it('check user\'s taskIDs array after remove task', (done) => {
        request(app)
        .post('/removeTask')
        .send({
            "_id": idToRemove
        })
        .end((err, res) => {
            console.log(res.text);
            assert(JSON.parse(res.text).success == 1);
            mod.User.findOne({email: 'testEmail1' }, function(error, user){
                assert(user.taskIDs.length == 1);
            })
            done();
        })
    })

    
});
