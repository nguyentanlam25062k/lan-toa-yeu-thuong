import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: Number(process.env.PORT),
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER_NAME: process.env.DATABASE_USER_NAME,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
  COOKIE_LIFE: Number(process.env.COOKIE_LIFE),

  DEFAULT_PAGE: Number(process.env.DEFAULT_PAGE),
  DEFAULT_LIMIT_PAGE: Number(process.env.DEFAULT_LIMIT_PAGE),
  DEFAULT_SORT_FIELD: process.env.DEFAULT_SORT_FIELD,

  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_DIRECTORY_CONTAIN_IMAGE: process.env.CLOUDINARY_DIRECTORY_CONTAIN_IMAGE,
}

export default config;