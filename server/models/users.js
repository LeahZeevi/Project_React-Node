const mongoose = require('mongoose');
const ItemsSchema  = require('./items');
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
    // myWardrobe: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'items' ,// הפניה למודל Items
    // }]
})
module.exports = mongoose.model('users', UserSchema);
