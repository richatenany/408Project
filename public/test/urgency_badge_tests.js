const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {

    var refDate = new Date();
    var late = new Date();
    var _1day = new Date();
    var _2day = new Date();
    var low = new Date();

    _1day.setDate(refDate.getDate() + 1);
    _2day.setDate(refDate.getDate() + 2);
    low.setDate(refDate.getDate() + 3);
    var k = 0;

    beforeEach(async function () {
        console.log("\n\nURGENCY B4 EACH\n\n")
        await mod.Task.remove({}); //clears all tasks
        //Add 15 Tasks
        for(var i = 1; i <= 20; i++){
            status = i % 3;
            if (i <= 5) {   //Late
               await mod.Task.create({ 
                    title: "lateTask" + i,
                    deadLine: late.toString(),
                    desc: "late" + i,
                    weight: 7,
                    category: "Work",
                    email: "testEmail1",
                    status: status
                });
            } else if (i <= 10) {   //1Day left
                await mod.Task.create({ 
                    title: "1DayTask" + i,
                    deadLine: _1day.toString(),
                    desc: "1Day" + i,
                    weight: 7,
                    category: "Work",
                    email: "testEmail1",
                    status: status
                });
            } else if (i <= 15) {    //2Days left
                await mod.Task.create({ 
                    title: "2DayTask" + i,
                    deadLine: _2day.toString(),
                    desc: "2Day" + i,
                    weight: 7,
                    category: "Work",
                    email: "testEmail1",
                    status: status
                });
            } else {    //Hella time
                await mod.Task.create({ 
                    title: "low" + i,
                    deadLine: low.toString(),
                    desc: "low" + i,
                    weight: 7,
                    category: "Work",
                    email: "testEmail1",
                    status: status
                });
            }
        }
    });

    var idToRemove = 0; //Need to store id to remove for next test...

    it('check urgency with getTasks todo', (done) => {
        request(app)
        .get('/getTasks/todo')
        .end((err, res) => {
            assert(JSON.parse(res.text).success == 1);
            var tasks = JSON.parse(res.text).content.tasks;
            tasks.forEach(x => {
                if(x.title.includes("low")) {
                    chai.expect(x.urgency).to.include("Low");
                }
                else if(x.title.includes("2Day")) {
                    chai.expect(x.urgency).to.include("2Day");
                }
                else if(x.title.includes("1Day")) {
                    chai.expect(x.urgency).to.include("1Day");
                }
                else {
                    chai.expect(x.urgency).to.include("Late")
                }
            });
            done();
        })
    })

});
