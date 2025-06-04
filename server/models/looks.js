const mongoose = require('mongoose');
const looksSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    nameLook: { type: String },
    itemsInlook: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items', // שם המודל שיצרת עבור פריטי לבוש
            required: true
        }
    ], dateCreation: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('looks', looksSchema);