const Items = require('../models/items'); 

 exports.assignTicketsAutomatically=async()=> {
  try {
    const result = await Items.updateMany(
      {}, 
      { $set: { inLaundryBasket: false } }
    );
    console.log(`עדכנת ${result.modifiedCount} פריטים לשדה inLaundryBasket=false`);
  } catch (error) {
    console.error('שגיאה בעדכון הפריטים:', error);
  }
}

