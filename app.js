const express = require('express')
const app = express();
const path = require('path')
const bodyParser=require('body-parser')

app.use(express.static('login'));
app.use(express.static('./public/dist/public'));
app.use(bodyParser.json())

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
