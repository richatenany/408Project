const assert = require('assert');
const {app} = require('../../app');
const mod = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

describe('Creating documents', () => {

    let now = Date.now();

    // let user;
    // before((done) => {
    //     user = mod.User.create({
    //         name: "tester1", 
    //         email: "testEmail1",  
    //         pass: "test",
    //         taskIDs: []
    //     })
    //     .then(() => done()) 
    // });

    it('creates a user', (done) => {
        console.log("here");
        request(app)
        .post('/processSignup')
        .send({
                // "title": "testTask1",
                // "deadLine": now,
                // "desc": "test_desc",
                // "weight": 3,
                // "category": "Work",
                // "email": "testEmail1"
                "name": "Nate Venckus",
                "email": "nateisgreat@gmail.com",
                "password": "hellopassword",
                "confirmPass": "hellopassword"
            
                


        })
        .end((err, res) => {
           // assert(JSON.parse(res.text).success == 1); //if user is saved to db it is not new

            mod.User.findOne({ email: 'Nate Venckus'}, function(error, user){
                assert(user.email == 'Nate Venckus');
                done();
            })
        })

    });
});

after(async (done) => {

    done()
  })