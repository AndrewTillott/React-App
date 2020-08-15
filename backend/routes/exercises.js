
const router = require('express').Router();
//we require the model that we created (a schema for the data)
let Exercise = require('../models/exercise.model');

//if the url is as such then we send this get request
router.route('/').get((req, res) => {
  Exercise.find()
    //we take the exercises from the server and then return them
    .then(exercises => res.json(exercises))
    //we return an error
    .catch(err => res.status(400).json('Error: ' + err));
});

//if we have exercises/add and its a post request
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  //we are converting the duration to a number
  const duration = Number(req.body.duration);
  //we are converting the date to a 'Date' data type
  const date = Date.parse(req.body.date);

  //then we create a new exercise from all of the variables that we got up there
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  //then we save the exercise
  newExercise.save()
  //if successful we return the json - exercise added
  .then(() => res.json('Exercise added!'))
  //or an error
  .catch(err => res.status(400).json('Error: ' + err));
});

//if the route is an id and then a get request, then we will only return data from that exercise
router.route('/:id').get((req, res) => {
  //get the id direct from ur, and find that one
  Exercise.findById(req.params.id)
  //return the exercise of that id as json
    .then(exercise => res.json(exercise))
  //or return an error
    .catch(err => res.status(400).json('Error: ' + err));
});

//find the exercise by id and delete it
router.route('/:id').delete((req, res) => {
  //delete that specific exercise of that id
  Exercise.findByIdAndDelete(req.params.id)
    //if successful then report that it has been deleted
    .then(() => res.json('Exercise deleted.'))
    //otherwise returns an error
    .catch(err => res.status(400).json('Error: ' + err));
});

//we are looking to update the id
//interestingly the post request doesn't say id or a colon example: /exercises/update/5cededc53751736f11
router.route('/update/:id').post((req, res) => {
  //find the exercise by its id
  Exercise.findById(req.params.id)
    .then(exercise => {
      //change all of the data to the newly input data 
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      //save the newly updated exercise data 
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;