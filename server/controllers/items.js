exports.addItem = async (req, res) => {
    console.log("enter add");

    console.log(req.file);
    let { ItemName, url, categoryName, season, categoryId, inUse, countWear, style } = req.body
    if (!req.file)
        return res.status(400).send('No file uploaded.');
    url = req.file.path; // נתיב התמונה ששמרת

    if (!ItemName || !categoryName) {
        return res.status(400).json({ message: "ItemName and categoryName is require" })
    }
    //lean(): המרה לקריאה בלבד מזרז את תהליך השאילתה
    const duplicate = await Item.findOne({ ItemName: ItemName }).lean()
    if (duplicate) {
        console.log(duplicate);
        return res.status(409).json({ message: "Dupliacated ItemName" })
    }

    const itemObject = { ItemName, url: req.file.path, categoryName, season, categoryId, inUse, countWear, style }
    const item = await Item.create(itemObject)

    if (item)
        return res.status(201).json({ message: `New item ${item.ItemName} created` })
    else
        return res.status(400).json({ message: `Invalid Item received` })
}









