const mongoose = require('mongoose');

const locksSchema = new mongoose.Schema({
    user_id: { type: String, required: true},
    itemsInlock: [{ type: mongoose.Types.ObjectId, require: true, ref: 'items' }],
    dateCreation: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('locks', locksSchema);