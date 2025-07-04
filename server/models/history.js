const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  item_id:{ type: mongoose.Types.ObjectId, required: true, ref: 'items' },
  wornEvent: [{ type: mongoose.Types.ObjectId, ref: 'wearnings' }]// Links to events
});



module.exports = mongoose.model('history', historySchema);
