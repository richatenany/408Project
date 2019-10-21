
const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {
/*
    var date = new Date(); //Date.now();
    var refDate = new Date();
    var invalidDate = new Date();
    invalidDate.setDate(invalidDate.getDate() - 1);
    var k = 0;

    beforeEach(async function () {
        //await mod.Task.remove({}); //clears all tasks
        //Add 5 Work Tasks
        var status = 0;
        for(var i = 1; i <= 5; i++){
            k = k + 2;
            status = i % 3;
            date.setDate(refDate.getDate() + (k % 3));
            await mod.Task.create({ 
                title: "workTask" + i,
                deadLine: date.toString(),
                desc: "test_desc" + i,
                weight: 5,
                category: "Work",
                email: "testEmail1",
                status: status
            });
        }
        //Add 10 Social Tasks
        for(var i = 6; i <= 15; i++){
            status = i % 3;
            date.setDate(refDate.getDate() + (k % 3));
            await mod.Task.create({ 
                title: "socialTask" + i,
                deadLine: date.toString(),
                desc: "test_desc" + i,
                weight: 5,
                category: "Social",
                email: "testEmail1",
                status: status
            });
        }
        //Add 15 Health Tasks
        for(var i = 16; i <= 30; i++){
            status = i % 3;
            date.setDate(refDate.getDate() + (k % 3));
            await mod.Task.create({ 
                title: "healthTask" + i,
                deadLine: date.toString(),
                desc: "test_desc" + i,
                weight: 5,
                category: "Health",
                email: "testEmail1",
                status: status
            });

        }
        //Add 15 Tasks for different users
        for(var i = 1; i <= 15; i++){
            status = i % 3;
            date.setDate(refDate.getDate() + (k % 3));
            if (i <= 5) {
               await mod.Task.create({ 
                    title: "notMyTask" + i,
                    deadLine: date.toString(),
                    desc: "notMine" + i,
                    weight: 7,
                    category: "Work",
                    email: "notme",
                    status: status
                });
            } else if (i <= 10) {
                await mod.Task.create({ 
                    title: "notMyTask" + i,
                    deadLine: date.toString(),
                    desc: "notMine" + i,
                    weight: 7,
                    category: "Health",
                    email: "notme",
                    status: status
                });
            } else {
                await mod.Task.create({ 
                    title: "notMyTask" + i,
                    deadLine: date.toString(),
                    desc: "notMine" + i,
                    weight: 7,
                    category: "Social",
                    email: "notme",
                    status: status
                });
            }
        }
    });

    var idToRemove = 0; //Need to store id to remove for next test...

    it('check getTasks todo', (done) => {
        request(app)
        .get('/getTasks/todo')
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("notme");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("testEmail1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"status\":0");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":2");
            done();
        })
    })

    it('check getTasks inProgress', (done) => {
        request(app)
        .get('/getTasks/inProgress')
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("notme");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("testEmail1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":0");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"status\":1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":2");
            done();
        })
    })

    it('check getTasks done', (done) => {
        request(app)
        .get('/getTasks/done')
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("notme");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("testEmail1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":0");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"status\":2");
            chai.expect(JSON.parse(res.text).content.tasks).to.have.lengthOf(12);
            done();
        })
    })

    var taskID = 0;

    it('check getTasks all_done', (done) => {
        request(app)
        .get('/getTasks/all_done')
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("notme");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("testEmail1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":0");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"status\":2");
            chai.assert.isAtLeast(JSON.parse(res.text).content.tasks.length, 12);


            //Get taskid for the next test
            mod.Task.findOne({ title: 'healthTask20' }, function(error, task){
                taskID = task._id;
            })
            done();
        })
    })

    it('check getTask', (done) => {
        request(app)
        .post('/getTask')
        .send({
            "taskID": taskID
        })
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("notme");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("testEmail1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":0");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.not.include("\"status\":1");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"status\":2");
            chai.expect(JSON.stringify(JSON.parse(res.text).content.tasks)).to.include("\"title\":\"healthTask20\"");
            chai.expect(JSON.parse(res.text).content.tasks).to.have.lengthOf(1);
            done();
        })
    })
    */
});
