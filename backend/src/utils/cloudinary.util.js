import cloudinary from "cloudinary";
import config from "../config/index.config";


cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
})

const uploadCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file,
      {folder: config.CLOUDINARY_DIRECTORY_CONTAIN_IMAGE},
      (error, result) => {
      if (error) throw error;

      resolve({
        imageUrl: result.url,
        imageId: result.public_id
      })
    })
  })
}

export default uploadCloudinary;