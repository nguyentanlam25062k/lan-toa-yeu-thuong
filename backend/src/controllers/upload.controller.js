import uploadService from '../services/upload.service';
import config from "../config/index.config";
import fs from "fs";

const uploadController = {};


uploadController.uploadImage = async (req, res) => {
  try {
    console.log('bulk =======', req.files)
    const data = await uploadService.uploadImage(req.files);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
}

uploadController.deleteImage = async (req, res) => {
  try {
    console.log('body', req.body);
    const data = await uploadService.deleteImage(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
}




export default uploadController