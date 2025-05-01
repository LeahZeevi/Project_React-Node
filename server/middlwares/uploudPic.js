const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file,callback) => {
      const categoryId = (req.body.categoryId)
      const uploadPath = `./public/uploadsPic/${categoryId}`;
  
      fs.mkdirSync(uploadPath, { recursive: true });
      callback(null, uploadPath);
    },
    filename: (req,file,callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  });

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'|| file.mimetype === 'image/JPG') {
        callback(null, true);
    }
  else 
    callback(null, false)

}

const uploudPic = multer({
    storage,
    fileFilter,
})
module.exports = uploudPic;
