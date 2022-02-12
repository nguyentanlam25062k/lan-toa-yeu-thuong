import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import db from '../models/index';
import userSchema from "../validators/user.validator";
import {hashPassword, comparePassword} from "../helpers/index.helper";

const userService = {};

userService.createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userSchema.signUp.validate(data);
      if (!error) {
        const {firstName, lastName, email, password} = value;
        const user = await db.User.findOne({
          where: { email}
        })
        if (!user) {
          const hashPasswordUser = await hashPassword(password);
          const newUser = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPasswordUser,
            role: 'R1'
          })

          const infoUser = {
            firstName: newUser.dataValues.firstName,
            lastName: newUser.dataValues.lastName,
            email: newUser.dataValues.email,
            role: newUser.dataValues.role
          };

          resolve({
            code: 0,
            msg: "Create a new user success !",
            data: infoUser
          });
        } else {
          resolve({
            code: 2,
            msg: "Your email is already in used, Pleas try another email !"
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        })
      }
    } catch (error) {
      reject({
        code: -1,
        msg: error
      });
    }
  })
}

userService.login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userSchema.signIn.validate(data);
      const {email, password} = value;
      if(!error) {
        const user = await db.User.findOne({
          where: { email },
          attributes: ['firstName', 'lastName', 'email', 'password', 'role']
        })
        if(user) {
          const validPassword = await comparePassword(password, user.password);
          delete user.password;

          if(validPassword) {
            resolve({
              code: 0,
              msg: "Login success !",
              data: user
            });
          } else {
            resolve({
              code: 3,
              msg: "Incorrect password !"
            })
          }
        } else {
          resolve({
            code: 2,
            msg: "User doesn't exist !"
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details
        })
      }
    } catch (error) {
      reject(error);
    }
  })
}

userService.logout = () => {
  return new Promise(async (resolve, reject) => {
    try {

    } catch (error) {
      reject(error);
    }
  })
}

export default userService;