const mongoose = require('mongoose');


const wearningsSchema = new mongoose.Schema({
 user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },

items: [{ type: mongoose.Types.ObjectId, ref: 'items' }]
});

module.exports =  mongoose.model('wearnings', wearningsSchema);
