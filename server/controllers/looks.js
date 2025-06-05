const Looks = require("../models/looks");
const Item = require("../models/items")
const mongoose = require('mongoose');

exports.addLook = async (req, res) => {
    const { user_id, nameLook, itemsInlook, dateCreation, inClothing } = req.body;
    console.log("addLook", req.body);

    if (!user_id || !itemsInlook) {
        return res.status(400).json({ message: "Missing user_id or itemsInlook" });
    }

    try {
        const existingLook = await Looks.findOne({ user_id, itemsInlook });
        if (existingLook) {
            return res.status(409).json({ message: "Look already exists for this user with the same items" });
        }

        const newLook = await Looks.create({ user_id, nameLook, itemsInlook, dateCreation, inClothing });
        if (!newLook) {
            return res.status(400).json({ message: "Invalid look received" });
        }

        const fullItems = await Item.find({ _id: { $in: newLook.itemsInlook } });

        res.status(201).json({ newLook: { ...newLook.toObject(), itemsInlook: fullItems } });
    } catch (error) {
        console.error('Error creating look:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllLooksByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    console.log("userId", user_id);

    try {
        const looks = await Looks.find({ user_id: new mongoose.Types.ObjectId(user_id) });

        if (!looks || looks.length === 0) {
            return res.status(404).json({ message: "No looks found" });
        }

        // הוספת פריטים מלאים לכל לוק
        const looksWithItems = await Promise.all(
            looks.map(async (look) => {
                const fullItems = await Item.find({ _id: { $in: look.itemsInlook } });
                return {
                    ...look.toObject(),
                    itemsInlook: fullItems,
                };
            })
        );

        return res.status(201).json({ allLooks: looksWithItems });
    } catch (error) {
        console.error('Failed to get looks:', error);
        return res.status(500).json({ message: 'Failed to get looks' });
    }
};

exports.updateLookInClothing = async (req, res) => {
    const { _id, inClothing, userId } = req.body;

    if (!_id || typeof inClothing !== 'boolean' || !userId) {
        return res.status(400).json({ message: "Missing _id, inClothing or userId" });
    }

    try {
        // עדכון הלוק עצמו
        const updatedLook = await Looks.findByIdAndUpdate(
            _id,
            { inClothing },
            { new: true }
        ).populate("itemsInlook");

        if (!updatedLook) {
            return res.status(404).json({ message: "Look not found" });
        }

        // Update the items contained in a block to inUse: true
        if (inClothing && updatedLook.itemsInlook?.length) {
            const itemIds = updatedLook.itemsInlook.map(item => item._id);
            await Item.updateMany(
                { _id: { $in: itemIds } },
                { $set: { inUse: true } }
            );
        }

        // Retrieve all the locks in the closet for the user
        const inClothingLooks = await Looks.find({ user_id: userId, inClothing: true }).populate("itemsInlook");

        return res.status(200).json({ updatedLook, inClothingLooks });
    } catch (error) {
        console.error('Failed to update look', error);
        return res.status(500).json({
            message: "Failed to update look",
            error: error.message
        });
    }
};



exports.updateNameOfLook = async (req, res) => {
    const { _id, nameLook } = req.body;

    if (!_id || !nameLook) {
        return res.status(400).json({ message: "Missing _id or nameLook" });
    }
    try {
        const updatedNameLook = await Looks.findByIdAndUpdate(
            _id,
            { nameLook: nameLook },
            { new: true }
        );

        if (!updatedNameLook) {
            return res.status(404).json({ message: "Look not found" });
        }
        return res.status(200).json({ updatedLook: updatedNameLook });
    } catch (error) {
        console.error('Failed to update look', error);
        return res.status(500).json({ message: "Failed to update look", error: error.message });
    }
};
exports.deletLook = async (req, res) => {
    const _id = req.params._id;
    try {
        const deletedLook = await Looks.findOneAndDelete({ _id });
        if (!deletedLook)
            return res.status(404).json({ message: "not found look " })

        res.json({ message: "Look deleted successfully" })
    }
    catch (error) {
        console.log('Failed to delete look ', error);
        res.status(500).json({ message: "Failed to delete look  " })
    }
}

