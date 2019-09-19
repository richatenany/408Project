const express = require('express')
const app = express();
const path = require('path')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
var session=require('express-session')
const bcrypt=require('bcrypt')

app.use(express.static('login'));
app.use(express.static('./public/dist/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret:'StratifySecrets!!',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}))

// type SUCCESS_STATE = -1 | 0 | 1;
// type SERVER_RESPONSE = {
//     success:SUCCESS_STATE,
//     message:string,
//     content?: Object
// };

const NUM_SALTS = 10;

mongoose.connect('mongodb://localhost/StratifyDB');

const UserSchema = new mongoose.Schema({
    name: {type:String, required:[true, "Name is required for User."], minlength: 2},
    email: {type:String, required:[true, "Email is required for User."]},
    pass: {type:String, required:[true, "Password is required for User."]},
    taskIDs: {type:[String]}
}, {timestamps: true});
mongoose.model('User', UserSchema);
const User = mongoose.model('User');

const TaskSchema = new mongoose.Schema({
    title: {type:String, required:[true, "Title is required for Task"], minlength: 2},
    deadLine: {type:Date, requred:[true, "Deadline is required for Task"]},
    desc: {type:String},
    weight: {type:Number, required:[true, "Weight is required for Task"]},
    category: {type:String, required:[true, "Category is required for Task"]},
    comments: {type:[String]},
    email: {type:String, required:[true, "Email is required for Task."]},
    status: {type:Number, required:[true, "Status is required for Task."], default:0},
    dateCompleted: {type:Date}
}, {timestamps: true});
mongoose.model('Task', TaskSchema);
const Task = mongoose.model('Task');

app.get('/login', (request, response) => {
    return response.sendFile(path.resolve('./login/login.html'))
})
app.post('/processLogin', (request, response) => {
    const {email, password} = request.body;
    console.log("Email:", email)
    console.log("Password:", password);
    const hashedPW = bcrypt.hashSync(password, NUM_SALTS);
    console.log("hashedPW:", hashedPW);

    User.findOne({email: email}, (error, user) => {
        if(error){
            //No user found, display error message
            const serverResponse = { success: -1, message: "Server Error"};
            return response.json(serverResponse);
        }
        else if(user === null){
            const serverResponse = { success: 0, message: "User not found"};
            return response.json(serverResponse);
        }
        else{
            if(bcrypt.compareSync(password, user.password)){
                //Don't do this, store info in session, and redirect to angular
                const serverResponse = { success: 1, message:"Login Successful", content: {userInfo: {name: user.name, email: user.email, taskIDs: user.taskIDs}}}
                return response.json(serverResponse);
            }
            const serverResponse = { success: 0, message: "Invalid Login"};
            return response.json(serverResponse);
        }
    })
})

//This has to be the last one
app.all('*', (request, response, next) => {
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})
var port = process.env.PORT || 8080
app.listen(port, function(){
    console.log("Server is listening on port 8080");
});

// app.listen(8000, () => {
//     console.log("Server is listening on port 8000");
// })
