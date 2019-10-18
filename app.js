const express = require('express')
const app = express();
const path = require('path')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
var session=require('express-session')
const bcrypt=require('bcrypt')
const nodemailer = require('nodemailer');
const emailRegex = require('email-regex');

app.set('views', __dirname + '/login');
app.set('view engine', 'ejs');

app.use(express.static('login'));
app.use(express.static('./public/dist/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret:'StratifySecrets!!',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:7*24*60*60*1000}
}))

// type SUCCESS_STATE = -1 | 0 | 1;
// type SERVER_RESPONSE = {
//     success:SUCCESS_STATE,
//     message:string,
//     content?: Object
// };

const NUM_SALTS = 10;

mongoose.connect('mongodb://localhost/StratifyDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
});

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

module.exports= {app, User, Task};
//module.exports = {User, Task};

app.get('/login', (request, response) => {
    sess = request.session;
    if(sess.loggedIn !== undefined && sess.loggedIn === true){
        return response.redirect('/')
    }
    var message = "";
    return response.render('login', {message : message});
})

app.get('/register', (request, response) => {
    sess = request.session;
    
    if(sess.loggedIn !== undefined && sess.loggedIn === true){
        return response.redirect('/')
    }
    var message = "";
    if(sess.ERROR1 == true) {
        message += "Email is already in use. ";
        sess.ERROR1 = false;
    } 
    if(sess.ERROR2 == true) {
        message += "Please enter a valid email address. ";
        sess.ERROR2 = false;
    } 
    if(sess.ERROR3 == true) {
        message += "Password is too long. ";
        sess.ERROR3 = false;
    } 
    if(sess.ERROR4 == true) {
        message += "Please make sure your passwords match. ";
        sess.ERROR4 = false;
    }
    else if(sess.ERROR2 == true && sess.ERROR4 == true){
        message += "Please enter a valid email address and ensure your passwords match."
        sess.ERROR2 = false;
        sess.error4 = false;
    }

    return response.render('newAcct', {message : message});
})

app.post('/processSignup', (request, response ) => {
    var flag = true;
    sess = request.session;

    sess.ERROR1 = false;
    sess.ERROR2 = false;
    sess.ERROR3 = false;
    sess.ERROR4 = false;

    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var confirmPass = request.body.confirmPassword;
    var test;
    console.log("HERE: ", name);

    User.findOne({ email }) 
        .then(user => {
            if(user) {
                flag = false;
                sess.ERROR1 = true;
                if(test) {
                    
                    return response.json(
                        {success:0, message: "Invalid"
                    })
                }
                
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
    console.log("HERE AFTER");
    if(!emailRegex({exact: true}).test(email)) {
        
        flag = false;
        sess.ERROR2 = true;
        if(test) {
            return response.json(
                {success:0, message: "Invalid"
            })
        }
        //return response.redirect("/register");
    }
    
    if(password.length > 20) {
        
        flag = false;
        sess.ERROR3 = true;
        if(test) {
            return response.json(
                {success:0, message: "Invalid"
            })
        }
        //return response.redirect("/register");
    }
    
    if(password !== confirmPass) {
        console.log("HERE AFTER3")
        flag = false;
        sess.ERROR4 = true;
        if(test) {
            return response.json(
                {success:0, message: "Invalid"
            })
        }
        //return response.redirect("/register");
    } 

    if(flag == false) {
        return response.redirect("/register");
    }
    
        
    if(flag == true) {
        
        bcrypt.hash(confirmPass, 10).then(hash => {
        const user = new User({
            name: name,
            email: email,
            pass: hash
        });
        emailConfirmation(email);
        user.save()
            .then(result => {
                if(test) {
                    
                    return response.json(
                        {success:1, message: "Successful creation"
                    })
                }
                return response.redirect('/login');
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
                var message = "Email or password is incorrect";
                return response.render("login.ejs", {message : message});
                /* return response.status(401).json({
                    sucess: 0,
                    message: "Email does not exist"
                }); */
            } 
           return bcrypt.compare(request.body.password, user.pass);
        })
        .then(result => {
            console.log(result);
            if(!result) {
                var message = "Email or password is incorrect";
                return response.render("login.ejs", {message : message});
            } else {
                sess = request.session;
                sess.email = request.body.email;
                sess.loggedIn = true;
                var value = true;
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

app.post('/createTask', (request, response) => {
    var title = request.body['title'];
    var deadLine = request.body['date'];
    var desc = request.body['desc'];
    var weight = request.body['weight'];
    var category = request.body['category'];
    var sess = request.session;
    var email;
    if(sess.email != null) { email = sess.email; }
    else {email = "testEmail1"};
    var status = 0;

    console.log("in create task \n");

    //validate input
    if(Date.parse(deadLine) < Date.now()) { return response.json({success:0, message:"Invalid deadline: must be after current date"})};
    if(weight < 0) { return response.json({success:0, message: "Invalid weight: task weights must be postive."})};

    User.findOne({email:email}, function(error, user){
        console.log("finding user...");
        if(error){
            return response.json({success:-1, message: 'Server error'});
        } else if(user == null){
            return response.json({success:0, message:'Unable to find user'})
        } else {
            var newTask = new Task({title:title, deadLine:deadLine, desc:desc, weight:weight, category:category, email:email, status:status});
            
            Task.findOne({email:email, title:title}, function(error, task){
                if(error){
                    return response.json({success:-1, message: 'Server error'});
                } else if(task == null){ //I.E. this user doesn't already have a task with this title
                    User.findOneAndUpdate({email:email}, {$addToSet: {taskIDs:newTask._id}}, function(error, user){
                        console.log('in update');
                        if(error){
                            return response.json({success:-1, message:'Server error or saving error'})
                        }
                        else if(user==null){
                            return response.json({success:0, message:'Unable to find user'})
                        }
                        else{
                            console.log('newTask: ', newTask);
                            newTask.save(function(error){
                                if(error){
                                    return response.json({success:0, message:"There was an error creating your task"});
                                } else {
                                    return response.json({success:1, message:"User found and task added: ", newTask});
                                }
                            });
                        }
                    })
                } else { //I.E. this user already has a task with this title
                    return response.json({success:0, message:'Task titles must be unique'});
                }
            })
            
        }
    })
})

app.post('/removeTask', (request, response) => {
    var sess = request.session;
    var id = request.body['_id'];
    var email = sess.email; 

    console.log('In remove task');

    User.findOne({email:email}, function(error, user){
        console.log("finding user...");
        if(error){
            return response.json({success:-1, message: 'Server error'});
        } else if(user == null){
            return response.json({success:0, message:'Unable to find user'})
        } else {
            Task.findOne({email:email, _id:id}, function(error, task){
                if(error){
                    return response.json({success:-1, message: 'Server error'});
                } else if(task == null){
                    return response.json({success:0, message:'Task not found'});
                } else { 
                    console.log('task id to be removed: ', task._id)
                    User.findOneAndUpdate({email:email}, {$pull: {taskIDs: task._id}}, function(error, user){
                        console.log('in update');
                        if(error){
                            return response.json({success:-1, message:'Server error or saving error'})
                        }
                        else if(user==null){
                            return response.json({success:0, message:'Unable to find user'})
                        }
                        else{

                            //Task removed from User's task list, now remove task from Task table
                            Task.remove({email:email, _id:id}, function(error){
                                if(error){
                                    return response.json({success:-1, message:'Error in Task.remove'});
                                } else {
                                    return response.json({success:1, message:'Task found and removed.'})
                                }
                            })
                        };

                    })
                }
            })

        }
    })

})

app.get('/getTasks/todo', (request, response)=>{
    var session = request.session;
    const email = session.email;

    Task.find({email:email, status:0}, (error, tasks) => {
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(tasks.length===0){
            return response.json({success:0, message:'No tasks found'})
        }
        else{
            return response.json({success: 1, message:"Found user tasks", content: {tasks: setUrgencyBadges(tasks)}})
        }
    })
})

app.get('/getTasks/inProgress', (request, response)=>{
    var session = request.session;
    const email = session.email;

    Task.find({email:email, status:1}, (error, tasks) => {
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(tasks.length===0){
            return response.json({success:0, message:'No tasks found'})
        }
        else{
            return response.json({success: 1, message:"Found user tasks", content: {tasks: setUrgencyBadges(tasks)}})
        }
    })
})

app.get('/getTasks/done', (request, response)=>{
    var session = request.session;
    const email = session.email;

    Task.find({email:email, status:2}, (error, tasks) => {
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(tasks.length===0){
            return response.json({success:0, message:'No tasks found'})
        }
        else{
            return response.json({success: 1, message:"Found user tasks", content: {tasks: setUrgencyBadges(tasks)}})
        }
    }).sort({dateCompleted:1}).limit(12);
})

app.get('/getTasks/all_done', (request, response)=>{
    var session = request.session;
    const email = session.email;

    Task.find({email:email, status:2}, (error, tasks) => {
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(tasks.length===0){
            return response.json({success:0, message:'No tasks found'})
        }
        else{
            return response.json({success: 1, message:"Found user tasks", content: {tasks: setUrgencyBadges(tasks)}})
        }
    })
})

app.get('/getTask', (request, response)=>{
    var id = request._id;

    Task.find({_id:id}, (error, tasks) => {
        if(error){
            return response.json({success:-1, message:'Server error'})
        }
        else if(tasks.length===0){
            return response.json({success:0, message:'No tasks found'})
        }
        else{
            return response.json({success: 1, message:"Found user task", content: {task: setUrgencyBadges(tasks)}})
        }
    })
})

app.post('/changeStatus', (request, response)=>{
    const session = request.session;
    const email = session.email;

    const {taskID, status} = request.body

    Task.findOne({_id: taskID}, (error, task)=>{
        if(error){
            return response.json({success:-1, message:'Error finding this task'})
        }
        else{
            if(task.email!==email){
                return response.json({success:0, message:'Not this users task'})
            }
            task.status=status;
            if (status == 2) { 
                task.dateCompleted = Date.now(); 
                console.log(task.dateCompleted);
            }
            task.save(error=>{
                if(error){
                    return response.json({success:0, message:'Unable to save task'})
                }
                return response.json({success:1, message:'Successfully updated task', content:{newTask: task}})
            })
        }
    })
})

app.post('/addComment', (request, response)=> {
    const session = request.session;
    const email = session.email;

    const {taskID, comment} = request.body

    Task.findOne({_id: taskID}, (error, task)=>{
        if(error){
            return response.json({success:-1, message:'Error finding this task'})
        }
        else{
            if(task.email!==email){
                return response.json({success:0, message:'Not this users task'})
            }
//             task.comments[task.comments.length] = comment;
            task.comments.push(comment);
            task.save(error=>{
                if(error){
                    return response.json({success:0, message:'Unable to save task'})
                }
                return response.json({success:1, message:'Successfully updated task', content:{newTask: task}})
            })
        }
    })
})

//This has to be the last one
app.all('*', (request, response, next) => {
    sess = request.session;
    if(sess.loggedIn === undefined || sess.loggedIn === false) {
        return response.redirect('/login');
    }
    return response.sendFile(path.resolve('./public/dist/public/index.html'))
})

// var port = process.env.PORT || 8080
// app.listen(port, function(){
//     console.log("Server is listening on port 8080");
// });

app.listen(8000, ()=>{
    console.log("Server is listening on port 8000")
})

function emailConfirmation(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
               user: 'theofficialstratify@gmail.com',
               pass: 'Stratify4082019'
           }
    });
    const mailOptions = {
        from: 'theofficialstratify@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Congratulations on making a Stratify Account!', // Subject line
        html: '<p>Congratulations on making a Stratify Account! We appreciate your support! Please log back in to get started!</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

function setUrgencyBadges(tasksFromDb) {
    var tasks = JSON.parse(JSON.stringify(tasksFromDb));
    var i = 0;
    tasks.forEach(task => {
        var remainingTime = Date.parse(task.deadLine) - Date.now()
        if(remainingTime < 0) {
            //remaining time is negative, object is past due
            task.urgency = "Late";
        } else if (remainingTime < Date.parse('02 Jan 1970 00:00:00 GMT')) {
            task.urgency = "1Day";
        } else if (remainingTime < Date.parse('03 Jan 1970 00:00:00 GMT')) {
            task.urgency = "2Day";
        } else {
            task.urgency = "Low";
        }
        i++;        
    });
    console.log(tasks);
    return tasks;
}
