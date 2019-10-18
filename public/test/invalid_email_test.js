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
                "name": "Nate VenckusIsWeird",
                "email": "nateisgreatTest4",
                "password": "hellopassword",
                "confirmPassword": "hellopassword",
                "test": true,
            
                


        })
        .end((err, res) => {
            mod.User.findOne({ name : 'Nate VenckusIsWeird'}, function(error, user){
                if(!user)
                done();
                else{
                    console.log("you messed up fam");
                    //done();
                }
                
            })
        })

    });
});

after(async (done) => {

    done()
  })