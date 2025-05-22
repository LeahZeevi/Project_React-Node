

const Wearnings = require('../models/wearnings');

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
