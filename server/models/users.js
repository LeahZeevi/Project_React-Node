
// const mongoose = require('mongoose');
// const ItemsSchema  = require('./items');
// const UserSchema = new mongoose.Schema({
    
//     userName: {
//         type: String,
//         required: [true, 'UserName is require']
//     },
//     city: {
//         type: String,
//         required: [true, 'city is require']
//     },
//     email: {
//         type: String,

//     },
//     password: {
//         type: String,
//         required: [true, "each user need password "]
//     },
//     myWardrobe:  [ItemsSchema] 
// })
// module.exports = mongoose.model('users', UserSchema);

const mongoose = require('mongoose');

const wardrobeItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    url: String,
    categoryName: {
        type: String,
        enum: ["חולצות", "חצאיות", "שמלות", "פיז'מות", "נעלים"],
        require: [true, "Item nust include category"]
    },
    session: {
        type: String,
        enum: ["חורף", "קיץ", "כללי"],
        default: "כללי"
    },
    inUse: {
        type: Boolean,
        default: false
    },
    countWear: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
        enum: ["ביסיק", "ספורט", "ספורט אלגנט", "אלגנט", "אחר"],
        default: "אחר"
    }
});

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
    myWardrobe: [wardrobeItemSchema] // שימוש בסכמה של הפריט כאן
});

module.exports = mongoose.model('users', UserSchema);