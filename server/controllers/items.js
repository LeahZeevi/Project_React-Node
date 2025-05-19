const { status } = require("express/lib/response");
const User = require("../models/users")
const Item = require("../models/items");
const { getUserById } = require("./users");
// const { saveImage } = require('../middlware/uploudPic');
const mongoose = require('mongoose');


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

// const { execFile } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// exports.addItem = async (req, res) => {
//   console.log("enter addItem");

//   const { _id } = req.params;
//   let { itemName, categoryName, session, inUse, countWear, style } = req.body;
//   let imageUrl = null;

//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   imageUrl = req.file.path; // נתיב התמונה שמור ב-multer

//   if (!itemName) {
//     itemName = "Unknown"; // אפשר לשים ברירת מחדל
//   }

//   try {
//     // מריצים את סקריפט הפייתון לקבלת חיזוי
//     const imagePath = path.resolve(imageUrl);

//     const predictedLabel = await new Promise((resolve, reject) => {
//       execFile("python3", ["F:/pythonProjectTry/predict.py", imagePath], (err, stdout, stderr) => {

//         if (err) {
//           console.error("Error running prediction:", err);
//           return reject("Error running prediction");
//         }
//         resolve(stdout.trim());
//       });
//     });

//     // משתמשים בתווית שחוזה הפייתון כקטגוריה
//     categoryName = predictedLabel;

//     // מחפשים את המשתמש לפי ID
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // מוסיפים את הפריט לארון הפרטי של המשתמש
//     user.myWardrobe.push({
//       itemName,
//       url: imageUrl,
//       categoryName,
//       session,
//       inUse,
//       countWear,
//       style,
//     });

//     const updatedUser = await user.save();

//     return res.status(200).json(updatedUser.myWardrobe);
//   } catch (error) {
//     console.error("Error adding item to wardrobe:", error);
//     return res.status(500).json({ message: "Failed to add item to wardrobe" });
//   }
// };



exports.getAllItems = async (req, res) => {

    const { _id } = req.params
    console.log(_id);
    try {
        const user = await User.findOne({ _id })
        if (!user) {
            return res.status(404).json({ message: "Failed to deliver the clothes. Customer not located" });
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
    const item = req.body;
    var inUse = item.inUse
    const item_id=item._id
    console.log("id",typeof _id);
    console.log(inUse);
    console.log("item_id",typeof item._id);


    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: _id, "myWardrobe._id": item._id },
            { $set: { "myWardrobe.$.inUse": inUse } },
            { new: true }
        );
     console.log("updateUser", updatedUser);
        if(!updatedUser)
            return res.status(404).json({ message: "not found" })
        // const updatedItem = updatedUser.myWardrobe.find(i => i._id === item._id);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Failed to update item:', error);
        res.status(500).json({ message: 'Failed to update item' });
    }
}

    // try {
    //     const user = await User.findOne({ _id });
    //     console.log(user);
    //     const myWardobe = user.myWardrobe;
    //     const s =myWardobe.find({item_id})
    //     console.log("s:",s);
        
    //     if (!user)



