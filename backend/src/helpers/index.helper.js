import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.config";
import {Op} from "sequelize";
import fs from "fs";

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

export const removeTempFile = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
}

export function APIFeatures(queryString) {
  this.queryString = {};

  this.paginating = () => {
    const page = Number(queryString.page) || 1;
    const limit = Number(queryString.limit) || 5;
    const offset = limit * (page - 1);
    this.queryString = {...this.queryString, offset, limit};
    return this;
  }

  this.sorting = () => {
    const sort = queryString.sort || 'createdAt';
    const order = sort.includes('-') ?
      [[queryString.sort.replace('-', ''), 'DESC']] :
      [[queryString.sort, 'ASC']];
    this.queryString = {...this.queryString, order};
    return this;
  }


  this.searching = () => {
    const search = queryString.search;
    this.queryString = {...this.queryString, where: {email: {[Op.like]: `%${search}%`}}}
    return this;
  }
}