const express = require('express')
const app = express();
const path = require('path')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

app.use(express.static('login'));
app.use(express.static('./public/dist/public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/StratifyDB');

const UserSchema = new mongoose.Schema({
    name: {type:String, required:[true, "Name is required for User."], minlength: 2}
}, {timestamps: true});
mongoose.model('User', UserSchema);
const User = mongoose.model('User');

app.get('/login', (request, response) => {
    return response.sendFile(path.resolve('./login/login.html'))
})

//This has to be the last one
app.all('*', (request, response, next) => {
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})
