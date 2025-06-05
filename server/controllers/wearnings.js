const Wearnings = require('../models/wearnings');
const History=require('../models/history');
const Item=require('../models/items')
exports.addWearning = async (req, res) => {
    let { user_id, items } = req.body;
    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Missing user_id or items array" });
    }
    const duplicate = await Wearnings.findOne({ items: items }).lean()
        if (duplicate) {
        return res.status(409).json({ message: "Dupliacated Wearnings" + duplicate })
    }
    const wearn = { user_id, items };
    try {
        const newWearning = await Wearnings.create(wearn); 
        console.log("newWearning", newWearning);

        res.status(201).json({ message: "Wearning created successfully", newWearn: newWearning });
    } catch (error) {
        console.error('Error creating wearning:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getEventWearByItemId = async (req, res) => {
    const { item_id } = req.params;

    if (!item_id) {
        return res.status(400).json({ message: "Missing item_id" });
    }

    try {
        // שולפים את כל ההיסטוריות שמכילות את הפריט לפי item_id, כולל populated אירועים
        const histories = await History.find({ item_id }).populate('wornEvent');
        
        if (!histories || histories.length === 0) {
            return res.status(404).json({ message: "No histories found for this item" });
        }

        // אוספים את כל הארועים מההיסטוריות
        const allEvents = [];
        for (const history of histories) {
            if (history.wornEvent && history.wornEvent.length > 0) {
                allEvents.push(...history.wornEvent);
            }
        }
      
        // עכשיו אוספים את כל הפריטים מכל הארועים (הנחה: כל אירוע מכיל שדה items שהוא מערך מזהי פריטים)
        const itemsSet = new Set();

        for (const event of allEvents) {
            if (event.items && Array.isArray(event.items)) {
                for (const id of event.items) {
                    // מוסיפים את כל המזהים למערכת Set כדי למנוע כפילויות
                    if (id.toString() !== item_id) { // לא מוסיפים את הפריט הנוכחי
                        itemsSet.add(id.toString());
                    }
                }
            }
        }

        const uniqueItemIds = Array.from(itemsSet);

        // שולפים את כל הפריטים לפי המזהים שנאספו
        const items = await Item.find({ _id: { $in: uniqueItemIds } });

        return res.status(200).json( items);

    } catch (error) {
        console.error('Failed to get related items', error);
        return res.status(500).json({ message: 'Failed to get related items' });
    }
};

