import config from "../config/index.config";
import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  console.log(user);
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFE });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFE });
};

export { createAccessToken, createRefreshToken };
