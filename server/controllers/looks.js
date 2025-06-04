const Looks = require("../models/looks");
const mongoose = require('mongoose');

exports.addLook = async (req, res) => {
    const { user_id, nameLook, itemsInlook, dateCreation } = req.body
    console.log("addLook", req.body);

    if (!user_id || !itemsInlook) {
        return res.status(400).json({ message: "Missing user_id or itemsInlook" });
    }
    try {
        const existingLook = await Looks.findOne({ user_id, itemsInlook });
        if (existingLook) {
            return res.status(409).json({ message: "Look already exists for this user with the same items" });
        }
        const newLook = await Looks.create({ user_id, nameLook, itemsInlook, dateCreation });
        if (!newLook) {
            return res.status(400).json({ message: "Invalid look received" });
        }
        res.status(201).json({ message: "Look created successfully", look: newLook });
    } catch (error) {
        console.error('Error creating look:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getAllLooksByUserId = async (req, res) => {

    const user_id = req.params.user_id;
    console.log("userId", user_id);
    try {

        const looks = await Looks.find({ user_id: new mongoose.Types.ObjectId(user_id) }).populate("itemsInlook");;
        if (!looks) {
            return res.status(404).json({ message: "not found looks" });
        }

        return res.json(looks)
    } catch (error) {
        console.error('failed to get user', error);
        res.status(500).json({ message: 'failed to get user' })
    }
}
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
    console.log(_id);
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

