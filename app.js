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

mongoose.connect('mongodb://localhost/StratifyDB', {useNewUrlParser: true, useUnifiedTopology: true});

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
    bcrypt.hash(request.body.confirmPass, 10).then(hash => {
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            pass: hash
        });
        console.log(request.body.confirmPass);
        user.save()
            .then(result => {
                response.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                console.log("ERROR");
                response.status(500).json({
                    error:err
                });
            });
    });
});

app.post('/processLogin', (request, response) => {
    /* console.log("HELLO");
    const {email, password} = request.body;
    console.log("Email:", email);
    console.log("Password:", password);
    const hashedPW = bcrypt.hashSync(password, NUM_SALTS);
    console.log("hashedPW:", hashedPW); */
    sess = request.session;
    sess.email = request.body.email;

    User.findOne({ email : request.body.email}) 
        .then(user => {
            if(!user) {
                return response.status(401).json({
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
                    message: "Incorrect password"
                });
            } else {
                sess = request.session;
                sess.email = request.body.email;
                // return response.sendFile(path.resolve('./public/dist/public/index.html'))
                return response.redirect('/');
            }

        })
        .catch(err => {
            console.log("HERE");
            return response.status(401).json({
                message: "Incorrect password"
            });
        });

   /* User.findOne({email: email}, (error, user) => {
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
        }
            const serverResponse = { success: 0, message: "Invalid Login"};
            return response.json(serverResponse);
        
    }) */
});

app.get('/processLogout', (request, response) => {
    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        } else {
            console.log("SUCCESS");
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
