const { status } = require("express/lib/response");
const User = require("../models/users")
const Item=require("../models/items");
const { getUserById } = require("./users");
// const { saveImage } = require('../middlware/uploudPic');



exports.addItem = async (req, res) => {
    console.log("enter addItem");

    const { _id } = req.params;
    let { itemName, url, categoryName, session, inUse, countWear, style } = req.body;
    let imageUrl = null;

    if (req.file) {
        imageUrl = req.file.path; // נתיב התמונה ש-multer שמר
    } else {
        return res.status(400).send('No file uploaded.');
    }

    if (!itemName || !categoryName) {
        return res.status(400).json({ message: "ItemName and categoryName are required" });
    }

    try {
        const user = await User.findById(_id); // השתמש ב-findById כדי למצוא משתמש
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // כעת, לאחר שמצאנו את המשתמש, נוסיף את הפריט לארון שלו
        user.myWardrobe.push({
            itemName,
            url: imageUrl,
            categoryName,
            session,
            inUse,
            countWear,
            style
        });

        const updatedUser = await user.save(); // שמור את השינויים במשתמש

        return res.status(200).json(updatedUser.myWardrobe);

    } catch (error) {
        console.error("Error adding item to wardrobe:", error);
        return res.status(500).json({ message: "Failed to add item to wardrobe" });
    }
};

exports.getAllItems = async (req, res) => {

    const { _id } = req.params
    console.log(_id);
    try {
        const user = await User.findOne({ _id})
        if (!user) {
            return res.status(404).json({message:"Failed to deliver the clothes. Customer not located"});
        }
        res.json(user.myWardrobe);

    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }

}

exports.getItemsByUserId = async (req, res) => {

    const { _id } = req.params;
    try {
        const item = await Item.findById({ _id });
        if (!item)
            return res.status(404).json({ message: "not found item " })
        res.json(item);

    }
    catch (error) {

        console.log('Failed to get item ', error);
        res.status(500).json({ message: "Failed to get item  " })
    }
}


exports.getItemsByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    console.log(categoryId);
    try {
        const items = await Item.find({ category: categoryId });
        if (!items)
            return res.status(404).json({ message: "not found itemd in this category" })
        res.json(items);

    } catch (error) {
        console.log('Failed to get item in this Category:', error);
        res.status(500).json({ message: "Failed to get item in this Category: " })
    }
}

exports.deletItem = async (req, res) => {
    const _id = req.params;
    console.log(_id);
    try {
        const deletedItem = await Item.findOneAndDelete({ _id: _id });
        if (!deletedItem)
            return res.status(404).json({ message: "not found item " })

        res.json({ message: "Item deleted successfully" })
    }
    catch (error) {
        console.log('Failed to delete item ', error);
        res.status(500).json({ message: "Failed to deleete item  " })
    }
}

exports.updateItem = async (req, res) => {
    const { _id } = req.params;
    const { inUse } = req.body;
    console.log(inUse);

    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: _id }, // עדכון לפי שדה userId
            { inUse: inUse },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found!' });
        }

        res.status(201).json(updatedItem);
    } catch (error) {
        console.error('Failed to update item:', error);
        res.status(500).json({ message: 'Failed to update item' });
    }
};

