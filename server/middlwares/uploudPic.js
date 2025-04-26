// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null,"../public/uploadsPic")
//     },
//     filename: (req, file, callback) => {
//         callback(null, `${Date.now()}-${file.originalname}`)
//     }
// })
// const fileFilter = (req, file, callback) => {
//     if (file.mimtype === 'image/jpeg' || file.mimtype === 'image/png'
//         || file.mimtype === 'image/jpg') {
//         callback(null, true);
//     }
//     callback(null, false)

// }

// const uploudPic = multer({
//     storage,
//     fileFilter,
// })
// module.exports = uploudPic;
