
const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'UserName is require']
    },
    city: {
        type: String,
        required: [true, 'city is require']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "each user need password "]
    },
});

module.exports = mongoose.model('users', UserSchema);




