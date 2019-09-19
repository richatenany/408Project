const express = require('express')
const app = express();
const path = require('path')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
var session=require('express-session')
const bcrypt=require('bcrypt')
const emailRegex = require('email-regex');

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

app.post('/processSignup', (request, response ) => {
    var flag = true;
    User.findOne({ email : request.body.email}) 
        .then(user => {
            if(user) {
                flag = false;
                return response.status(401).json({
                    success: 0,
                    message: "Email already exists"
                });
            }

        })
        .catch(err => {
            flag = false;
            console.log("ERROR");
            response.status(500).json({
                success: -1,
                error:err
            });
        });
    
    if(!emailRegex({exact: true}).test(request.body.email)) {
        return response.status(401).json({
            success: 0,
            message: "Not a valid email"
        });
    }
    var pass = request.body.password 
    if(request.body.password.length > 20) {
        flag = false;
        return response.status(401).json({
            success: 0,
            message: "Password too long"
        });
    }
    if(request.body.password !== request.body.confirmPass) {
        flag = false;
        return response.status(401).json({
            success: 0,
            message: "Passwords do not match"
        });
    } 
    
        
    if(flag == true) {
        bcrypt.hash(request.body.confirmPass, 10).then(hash => {
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            pass: hash
        });
        user.save()
            .then(result => {
                response.status(201).json({
                    success: 1,
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                console.log("ERROR");
                response.status(500).json({
                    success: -1,
                    error:err
                });
            });
    });
    }   
});

app.post('/processLogin', (request, response) => {
    
    User.findOne({ email : request.body.email}) 
        .then(user => {
            if(!user) {
                return response.status(401).json({
                    sucess: 0,
                    message: "Email does not exist"
                });
            } 
           return bcrypt.compare(request.body.password, user.pass);
        })
        .then(result => {
            console.log(result);
            if(!result) {
                console.log("FALSE");
                return response.status(401).json({
                     sucess: 0,
                     message : "Incorrect password"
                });
            } else {
                sess = request.session;
                sess.email = request.body.email;
                sess.loggedIn = true;
                
                return response.redirect('/');
            }

        })
        .catch(err => {
            console.log("HERE");
            return response.status(401).json({
                success: -1,
                message: "Log In Failed"
            });
        });

});

app.get('/processLogout', (request, response) => {
    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        } else {
            return response.redirect('/login');
        }
    });
});

//This has to be the last one
app.all('*', (request, response, next) => {
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})
