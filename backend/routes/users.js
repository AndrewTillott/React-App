//we need the express router, because we are creating a route
const router = require('express').Router();
//reuire the model that we created in a different file
let User = require('../models/user.model');

//the first route, that handles http git requests, on the / users url.
router.route('/').get((req, res) => {
  /*A Mongoose method that will get a list of all the users from the MongoDB database
  The find method returns a promise 
  */
  User.find()
  //We are going to return the users in json format that we got from the database
    .then(users => res.json(users))
    //we will return an error and the error message
    .catch(err => res.status(400).json('Error: ' + err));
});

//if the url has /add at the end then its a post request
router.route('/add').post((req, res) => {
  //req.body holds paramerts that are sent up from the client as part of the POST request.
  //presumably in this instance the username is the username provided by the client when he tried to create a new username
  const username = req.body.username;
  //we create a new instance of user, using the username (remember the shema requirements on user.model.js)
  const newUser = new User({username});
  //new user is saved to the database
  newUser.save()
    //once the user is added to the database, we return user added
    .then(() => res.json('User added!'))
    //alternatively we return an error
    .catch(err => res.status(400).json('Error: ' + err));
});
//we now export the router
module.exports = router;