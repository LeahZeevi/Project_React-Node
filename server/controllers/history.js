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
            item.wornEvent.push(wornEvent);
            await item.save();
            return res.status(200).json({ message: "add history item updated successfully", updateItem: item });
        }

        else {
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

//מחזירה את מערך הארועים שהפריט השתתף בהם
