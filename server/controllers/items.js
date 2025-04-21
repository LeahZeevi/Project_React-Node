const Item = require("../models/items")
const multer = require('multer');


// exports.addItem = async (req, res) => {
//     console.log(req.body);
//     // const { path :image}=req.file
//     //במידה והניתוב לא נשמר באופן נכו אפשר לעשות כך:
//     //image.replace('\\','/);
//     // console.log(req.file);
//     const item = await Item.create(req.body)
//     res.json(item)
// }


// הגדרת אחסון התמונות
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploadsPic/');  // תיקיית העלאת התמונות
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

// הגדרת סינון קבצים (רק תמונות JPEG ו-PNG)
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// הגדרת Multer
const uploadPic = multer({
  storage,
  fileFilter
});

// פונקציית הוספת פריט עם תמונה
exports.addItem = async (req, res) => {
  console.log(req.body);
  console.log(req.file); // בודקים את הקובץ שהועלה
  // אם לא הועלתה תמונה
  if (!req.file) {
    return res.status(400).json({ message: 'חייבת להיבחר תמונה' });
  }

  const itemData = {
    ...req.body, // כל הנתונים ששולחים בטופס
    url: req.file.path // שמירת הנתיב לתמונה
  };

  try {
    const item = await Item.create(itemData); // יצירת פריט חדש
    res.json(item); // החזרת הפריט שנשמר
  } catch (error) {
    console.error('Failed to add item:', error);
    res.status(500).json({ message: 'שגיאה בהוספת פריט' });
  }
};


exports.getItemById = async (req, res) => {

    const { _id } = req.params;
    console.log(_id);
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

exports.deletItem= async (req, res) => {
  
    const itemId  = req.params.itemId;
    console.log(itemId);
    try {
        const deletedItem = await Item.findOneAndDelete({ itemId: itemId });
        if (!deletedItem)
            return res.status(404).json({ message: "not found item " })
        
    res.json({message:"Item deleted successfully"})
}
    catch(error){
        console.log('Failed to delete item ', error);
        res.status(500).json({ message: "Failed to deleete item  " })
    }
}

exports.updateItem = async (req, res) => {
    const { itemId } = req.params;
    const {inUse } = req.body;
  
    try {
      const updatedItem = await User.findOneAndUpdate(
        { itemId: itemId }, // עדכון לפי שדה userId
        { inUse },
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.json(updatedItem);
    } catch (error) {
      console.error('Failed to update item:', error);
      res.status(500).json({ message: 'Failed to update item' });
    }
  };