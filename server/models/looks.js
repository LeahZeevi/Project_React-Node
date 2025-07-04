const mongoose = require('mongoose');
const looksSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    nameLook: { type: String },
    itemsInlook: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items',
            required: true
        }
    ], dateCreation: {
        type: Date,
        default: Date.now
    },
    inClothing: {
        type: Boolean,
        default: false
    },
});



module.exports = mongoose.model('looks', looksSchema);