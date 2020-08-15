
//allows us to quickly and easily create a server
const express = require('express');
/*allows us to make ajax requests. Ajax requests 
are updating information / requesting data without reloading the page
*/
const cors = require('cors');
//Makes it easier to connect with the MongoDB database
const mongoose = require('mongoose');

//Allows me to have environment variables in the .env file
require('dotenv').config();

//this is the setting up of the express server
const app = express();
//setting the port that the server will be on
const port = process.env.Port || 3000;

//Set up of middleware
app.use(cors());
//allows us to parse json as the server will be sending and receiving Json.
app.use(express.json());

//connect to the MongoDB Atlas
//You get the uri from the MongoDB Atlas dashboard
const uri = process.env.ATLAS_URI;
//You connect with the correct uri in order to start the connection
mongoose.connect(uri, {
    //useNewUrlParser allows for the parsing of the stings. Both things are just necesasry due to mongoDB updates and deprecation
    useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
    //once a connection has been secured, console log to tell me
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

//requiring files from the routes section
const exercisesRouter = require('./routes/exercises');

//This would then go to the users file, find the relevant router.route that applies (what is the url) and then fire it. Here is a route route example: router.route('/').get((req, res) => {
const usersRouter = require('./routes/users');

//using the files that we required
//now when someone goes to the root url to /exercises - it will oad everything in the exercises router

app.use('/exercises', exercisesRouter);
//if someone goes to /users it will load everything in the usersRouter
app.use('/users', usersRouter);

//Starts the server on a certain port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});