const mongoose = require('mongoose');
const tables = require('../../app');
const mod = require('../../app.js');

//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/StratifyDB'); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.log('Error : ',error);
    });

beforeEach(async function () {

    let user = await mod.User.create({
        name: "tester1", 
        email: "testEmail1",  
        pass: "test",
        taskIDs: []
    })
});

//Called hooks which runs before something.
after(async function () {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
      await collection.remove()
    }
    
});
