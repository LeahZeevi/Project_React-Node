const mongoose = require('mongoose');

const locksSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    itemsInlock: [{ type: Item, require: true, ref: 'items' }],
    dateCreation: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('locks', locksSchema);