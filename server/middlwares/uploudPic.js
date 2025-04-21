const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploadsPic/')
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})
const fileFilter = (req, file, callback) => {
    if (file.mimtype === 'image/jpeg' || file.mimtype === 'image/png'
        || file.mimtype === 'image/jpg') {
        callback(null, true);g
    }
    callback(null, false)

}

const uploudPic = multer({
    storage,
    fileFilter,
})
module.exports = uploudPic;