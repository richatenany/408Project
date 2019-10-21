const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {

    var refDate = new Date();
    var date = new Date();
    date.setDate(refDate.getDate() + 3);
    var task;

    beforeEach(async function () {
        //await mod.Task.remove({}); //clears all tasks
        await mod.Task.create({ 
            title: "taskToComment",
            deadLine: date.toString(),
            desc: "A",
            weight: 7,
            category: "Work",
            email: "testEmail1",
            status: 0
        });
        task = await mod.Task.find({ title:"taskToComment" });
    });

    var idToRemove = 0; //Need to store id to remove for next test...

    it('check add comment', (done) => {
        request(app)
        .post('/addComment')
        .send({
            "taskID": task[0]._id,
            "comment":"comment number 1"
        })
        .end((err, res) => {
            //assert(JSON.parse(res.text).success == 1);
            mod.Task.findOne({ "_id": task[0]._id }, function(error, task){
                console.log("\nHERE WE ARE AGAIN\n")
                console.log(task);
                chai.expect(task.comments).to.have.length(1);
                done();
            })
        })
    })

    it('check add second comment', (done) => {
        request(app)
        .post('/addComment')
        .send({
            "taskID": task[0]._id,
            "comment":"comment number 2"
        })
        .end((err, res) => {
            //assert(JSON.parse(res.text).success == 1);
            mod.Task.findOne({ "_id": task[0]._id }, function(error, task){
                console.log("\nHERE WE ARE AGAIN AGAIN\n")
                console.log(task);
                chai.expect(task.comments).to.have.length(2);
                done();
            })
        })
    })

});
