import dotenv from "dotenv";
import multer from "multer";

import upload from "../utils/multer.util";
import uploadCloudinary from '../utils/cloudinary.util';
var cloudinary = require('cloudinary').v2;
import fs from 'fs'

const validateImage = async (req, res, next) => {
  try {
    const uploader = async (path) => await uploadCloudinary(path, 'lan-toa-yeu-thuong');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    console.log({files})

    console.log(urls)
    res.status(200).json({
      code: 0,
      msg: "Test upload",
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: -1,
      msg: "Error from server !"
    })
  }
}

export default validateImage;