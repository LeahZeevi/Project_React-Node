const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  itemName: { type:String, required: true}, // קישור לפריט
  wornEvent: [{ type: mongoose.Types.ObjectId, ref: 'wearnings' }] // קישורים לאירועים
});



module.exports = mongoose.model('history', historySchema);
