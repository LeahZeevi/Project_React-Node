const { status } = require("express/lib/response");
const Item = require("../models/items");
// const { saveImage } = require('../middlware/uploudPic');
const mongoose = require('mongoose');
const axios=require("axios");
const fs = require("fs");
const FormData = require('form-data');


exports.addItem = async (req, res) => {
     const { _id } = req.params;
    let { userId, itemName, categoryName,image, session, inUse, countWear, style } = req.body;
    let imageUrl = null;

    if (req.file) {
        imageUrl = req.file.path;
    } else {
        return res.status(400).send('No file uploaded.');
    }
    if (!itemName || !categoryName) {
        return res.status(400).json({ message: "ItemName and categoryName are required" });
    }
    try {
        const item={userId,itemName,image,categoryName,session,inUse,countWear,style}
      const newItem=await Item.create(item)
      if(newItem)
        return res.status(201).json(newItem)

    } catch (error) {
        console.error("Error adding item :", error);
return res.status(500).json({ message: "Failed to add item", error: error.message });
    }
};

exports.getAllItemsById = async (req, res) => {
    const { _id } = req.params
    console.log("userId",_id);
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)){
            console.warn("לא תקין id",_id)
            return res.status(400).json({message:"Invaild user ID format"})
        }
        const items = await Item.find({userId:new mongoose.Types.ObjectId(_id)})
        if (!items) {
            return res.status(404).json({ message: "not found items" });
        }
        return res.json(items)
    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }
}

exports.getItemById = async (req, res) => {

    const { _id } = req.params;
    try {
        const item = await Item.findOne({ _id });
        if (!item)
            return res.status(404).json({ message: "not found item " })
      res.json(item);
    }
    catch (error) {

        console.log('Failed to get item ', error);
        res.status(500).json({ message: "Failed to get item  " })
    }
}

exports.deletItem = async (req, res) => {
    const _id = req.params;
    console.log(_id);
    try {
        const deletedItem = await Item.findOneAndDelete({ _id });
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
    const { _id ,inUse} = req.params;
    const item=req.body;
    console.log("_id",_id);
    console.log("item",item);
    
    try {
        const updateItem = await Item.findByIdAndUpdate(
             _id ,
            {inUse:inUse},
            {new:true}
        );
        if (!updateItem)
            return res.status(404).json({ message: "not found item and not updated" })

        res.json(updateItem)
    }
    catch (error) {
        console.log('Failed to update item ', error);
        res.status(500).json({ message: "Failed to deleete item  " })
    }
}


exports.predictCategory = async (req, res) => {
  try {
console.log("req.file:", req.file);
if (!req.file) {
  return res.status(400).json({ error: 'No image file uploaded' });
}

    const form = new FormData();
form.append("image", fs.createReadStream(req.file.path), req.file.originalname);

    const response = await axios.post("http://127.0.0.1:5000/predict", form, {
      headers: form.getHeaders()
    });

    // מחזיר ל-Frontend את הקטגוריה שחוזה המודל
    res.json({ predictedCategory: response.data.predicted_class });
  } catch (error) {
    console.error("שגיאה בניבוי קטגוריה:", error.message);
    res.status(500).json({ error: "שגיאה בשירות החיזוי" });
  } finally {
    fs.unlinkSync(req.file.path); // מוחק את הקובץ הזמני
  }
};



//לא נראה לי שצריך
// exports.getItemsByCategoryId = async (req, res) => {
//     const { categoryId } = req.params;
//     console.log(categoryId);
//     try {
//         const items = await Item.find({ category: categoryId });
//         if (!items)
//             return res.status(404).json({ message: "not found itemd in this category" })
//         res.json(items);

//     } catch (error) {
//         console.log('Failed to get item in this Category:', error);
//         res.status(500).json({ message: "Failed to get item in this Category: " })
//     }
// }
