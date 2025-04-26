const { status } = require("express/lib/response");
const Item = require("../models/items")
// const { saveImage } = require('../middlware/uploudPic');
const User = require('../models/users');

exports.addItem = async (req, res) => {
    console.log(req.file);
       const {ItemName,url,categoryName,season,categoryId,inUse,countWear,style}=req.body
     const { path :image}=req.file.path

    if(!ItemName||!categoryName||!season){
        return res.status(400).json({message:"item with this name is exist"})
    }
        //lean(): המרה לקריאה בלבד מזרז את תהליך השאילתה
    const duplicate=await User.findOne({ItemName:ItemName}).lean()
    if(duplicate){
        console.log(duplicate);
       return res.status(409).json({message:"Dupliacated ItemName"})}
      
         const itemObject={ItemName,url:req.file.path,categoryName,season,categoryId,inUse,countWear,style}
        const item=await Item.create(itemObject)

       if(item)
               return res,status(201).json({message:`New item ${item.ItemName } created`})
            else
            return res,status(400).json({message:`Invalid Item received`})
        
            
        }


exports.getItemById = async (req, res) => {

    const { _id } = req.params;
    //const { _id } = req.params._id;
    console.log(_id);

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
