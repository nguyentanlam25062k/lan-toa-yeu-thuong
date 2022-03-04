import uploadCloudinary from "../utils/cloudinary.util";

const {Op} = require("sequelize");
import {removeTempFile} from "../helpers/index.helper";
import cloudinary from "cloudinary";

const uploadService = {};

uploadService.uploadImage = (images) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!images) {
        resolve({
          code: 1,
          msg: "No file upload !"
        })
      } else {
        let isValidImages = true;
        let posInValidImage = null;
        let listImage = [];
        for (let i = 0; i < images.length; i++) {
          if (!['image/jpeg', 'image/png'].includes(images[i].mimetype)) {
            removeTempFile(images[i].path);
            resolve({
              code: 2,
              msg: "Invalid format file !"
            });
            isValidImages = false;
            posInValidImage = i;
            break;
          }
          if (images[i].size > 1024 * 1024) {
            removeTempFile(images[i].path);
            resolve({
              code: 3,
              msg: "File too large !"
            });
            isValidImages = false;
            posInValidImage = i;
            break;
          }
        }
        if (!isValidImages) {
          for (let i = 0; i < posInValidImage; i++) {
            if (images[i].path) removeTempFile(images[i].path);
          }
        } else {
          for (let i = 0; i < images.length; i++) {
            const image = await uploadCloudinary(images[i].path);
            removeTempFile(images[i].path);
            listImage.push(image);
          }
          resolve({
            code: 0,
            msg: "Upload image success !",
            body: listImage
          })
        }
      }
    } catch (e) {
      reject({
        code: -1,
        msg: 'Error from server'
      });
    }
  })
}

uploadService.deleteImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {imageId} = data;
      if (imageId) {
        const deleteImage = await cloudinary.v2.uploader.destroy(imageId);
        if (deleteImage.result === 'ok') {
          resolve({
            code: 0,
            msg: 'Delete image success',
          })
        } else {
          resolve({
            code: 2,
            msg: `Can't not found directory cloudinary`,
          })
        }
      } else {
        resolve({
          code: 1,
          msg: 'No images selected'
        })
      }
    } catch (e) {
      reject({
        code: -1,
        msg: 'Error from server',
      });
    }
  })
}

export default uploadService;