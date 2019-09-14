const express=require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const passport = require("passport");

const app=express();//create an express app

app.use(bodyParser.urlencoded({extended:true}))//for parsing application/x-www-form-urlencoded
app.use(bodyParser.json())//for parsing application/json

// Configuring the database
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const users = require('./app/routes/user.routes.js');

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport.config.js")(passport);
// Routes
app.use("",users);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message":"Welcome to Lavish Sales Force Automation System!"});
});

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});