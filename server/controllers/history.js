const { default: mongoose } = require("mongoose");
const History = require("../models/history");
exports.addHistoryItem = async (req, res) => {
    try {
        let { item_id, wornEvent } = req.body;
        const history = { item_id, wornEvent };
        if (!item_id || !wornEvent) {
            return res.status(400).json({ message: "Missing item_id or wornEvent" });
        }
        const item = await History.findOne({ item_id: item_id })
        if (item) {
            console.log("item_id", item.wornEvent);
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
exports.getEventWearByItemId = async (req, res) => {
    const { item_id } = req.params
    console.log("itemName", item_id);
    try {
        if (!item_id) {
            return res.status(400).json({ message: "Missing itemName" });
        }
        const histories = await History.find({ item_id: item_id }).populate('wornEvent');
        console.log("histories", histories);
        if (!histories) {
            return res.status(404).json({ message: "not found history" });
        }
        const allWornEventsData = []; //מערך אוביקטים של כל הארועים שהפריט השתתף בהם

        for (let doc of histories) {
            if (doc.wornEvent && doc.wornEvent.length > 0) {
                allWornEventsData.push(...doc.wornEvent);
            }
        }
        return res.status(200).json({allWornEventsData:allWornEventsData});
        // return res.json(history)
    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }
}
//מחזירה את מערך הארועים שהפריט השתתף בהם
