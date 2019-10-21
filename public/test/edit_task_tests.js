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
        await mod.Task.remove({}); //clears all tasks
        await mod.Task.create({ 
            title: "taskToEdit",
            deadLine: date.toString(),
            desc: "A",
            weight: 7,
            category: "Work",
            email: "testEmail1",
            status: 0
        });
        task = await mod.Task.find({ title:"taskToEdit" });
    });

    var idToRemove = 0; //Need to store id to remove for next test...

    it('check edit task', (done) => {
        request(app)
        .post('/editTask')
        .send({
            "taskID": task[0]._id,
            "title": "afterEdit",
            "date": date.toString(),
            "weight": 3,
            "desc": "A",
            "category": "Work",
            "email": "testEmail1"
        })
        .end((err, res) => {
            //assert(JSON.parse(res.text).success == 1);
            mod.Task.findOne({ "_id": task[0]._id }, function(error, task){
                console.log("\nHERE WE ARE\n")
                console.log(task);
                assert(task.title === 'afterEdit');
                assert(task.desc === 'A')
                done();
            })
        })
    })

});
