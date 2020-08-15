const mongoose = require('mongoose');

//allowing us to create a new schema 
const Schema = mongoose.Schema;

//creating a schema for the user's name (with our requirements for it)
const userSchema = new Schema({
    username: {
        //data must be a string
        type: String,
        //it is required
        required: true,
        //its unique
        unique: true,
        //white space is trimmed
        trim: true, 
        //has at least three letters
        minlength: 3
    },

}, {
    //when it is adjusted this and the relevant time is recorded
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;