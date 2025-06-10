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



//Returns all items that participated in the item's event:
//Retrieves the events in which the current item participated from the history collection,
//For each event from the events collection, retrieves all items that participated in that event from the items collection.

exports.getEventWearByItemId = async (req, res) => {
    const { item_id } = req.params;

    if (!item_id) {
        return res.status(400).json({ message: "Missing item_id" });
    }

    try {
       // Retrieve all histories containing the item by item_id, including populated events
        const histories = await History.find({ item_id }).populate('wornEvent');
        
        if (!histories || histories.length === 0) {
            return res.status(404).json({ message: "No histories found for this item" });
        }

       // Collect all events from the history
        const allEvents = [];
        for (const history of histories) {
            if (history.wornEvent && history.wornEvent.length > 0) {
                allEvents.push(...history.wornEvent);
            }
        }
      
   // Now we collect all the items from all the events (assumption: each event contains an items field which is an array of item IDs)
        const itemsSet = new Set();

        for (const event of allEvents) {
            if (event.items && Array.isArray(event.items)) {
                for (const id of event.items) {
                    if (id.toString() !== item_id) {
                        itemsSet.add(id.toString());
                    }
                }
            }
        }

        const uniqueItemIds = Array.from(itemsSet);

        // Retrieve all items by the collected IDs
        const items = await Item.find({ _id: { $in: uniqueItemIds } });

        return res.status(200).json( items);

    } catch (error) {
        console.error('Failed to get related items', error);
        return res.status(500).json({ message: 'Failed to get related items' });
    }
};

