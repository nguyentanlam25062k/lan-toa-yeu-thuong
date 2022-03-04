import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('./public/uploads'))
      fs.mkdirSync('./public/uploads');
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const uploadMulter = multer({storage: storage})

module.exports = uploadMulter;