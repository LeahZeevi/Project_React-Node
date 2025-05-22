const { default: mongoose } = require("mongoose");
const History = require("../models/history");
exports.addHistoryItem = async (req, res) => {
    try {
        let {user_id, itemName, wornEvent } = req.body;
        const history = { user_id, itemName, wornEvent };
        if (!user_id || !wornEvent || !itemName) {
            return res.status(400).json({ message: "Missing user_id or wornEvent" });
        }
            const item = await History.findOne({ user_id:user_id,itemName:itemName })
            if (item) {
                console.log("item", item.wornEvent);
                item.wornEvent.push(wornEvent);
                await item.save();
                return res.status(200).json({ message: "add history item updated successfully", updateItem: item });
            }
        
        else {
            console.log("not found item");
            
            const newHistoryItem = await History.create(history);
            if (!newHistoryItem) {
                return res.status(400).json({ message: "Invalid history item received" })
            }
            res.status(201).json({ message: "History item created successfully", historyItem: newHistoryItem });
        }
    }
    catch (error) {
        console.error('Error creating history item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getEventWearByItemName = async (req, res) => {
    const { itemName } = req.params
    console.log("itemName", itemName);
    try {
        if (!itemName) {
            return res.status(400).json({ message: "Missing itemName" });
        }
        const histories = await History.find({ itemName:itemName });
        console.log("histories", histories);
        if (!histories) {
            return res.status(404).json({ message: "not found history" });
        }
        for (let doc of histories) {
            for (let event of doc.wornEvent) {
                console.log(event.items); 
            }
        }
        // return res.json(history)
    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }
}