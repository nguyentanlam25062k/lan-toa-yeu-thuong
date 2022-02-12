import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.config";

export const hashPassword = (password) => {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  })
}

export const comparePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

export const createAccessToken = (user) => {
  console.log(user);
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFE});
}

export const createRefreshToken = (user) => {
  return jwt.sign(user, config.REFRESH_TOKEN_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFE});
}
