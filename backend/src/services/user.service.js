const { Op } = require("sequelize");
import db from "../models/index";
import { userSchema } from "../schemas/index.schema";
// import { hashPassword, comparePassword } from "../helpers/index.helper";
import { hashPassword, comparePassword } from "../utils/index.util";
import _ from "lodash";
import config from "../config/index.config";
import { APIFeatures } from "../utils/index.util";

const userService = {};

userService.login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { value, error } = userSchema.signIn.validate(data);
      const { email, password } = value;
      if (!error) {
        const user = await db.User.findOne({
          where: { email },
          attributes: ["firstName", "lastName", "email", "password", "role"]
        });
        if (user) {
          const validPassword = await comparePassword(password, user.password);
          delete user.password;

          if (validPassword) {
            resolve({
              code: 0,
              msg: "Login success !",
              body: user
            });
          } else {
            resolve({
              code: 3,
              msg: "Incorrect password !"
            });
          }
        } else {
          resolve({
            code: 2,
            msg: "User doesn't exist !"
          });
        }
      } else {
        resolve({
          code: 1,
          msg: error.details
        });
      }
    } catch (error) {
      reject({
        code: -1,
        msg: "Error from server"
      });
    }
  });
};

userService.createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { value, error } = userSchema.createUser.validate(data);
      if (!error) {
        const { name, email, password, gender, phone, districtId, provinceId, wardId } = value;
        const { imageId, imageUrl } = data;
        const user = await db.User.findOne({
          where: { email }
        });
        if (!user) {
          const hashPasswordUser = await hashPassword(password);
          const infoUser = await db.User.create({
            name: name,
            email: email,
            password: hashPasswordUser,
            gender: gender,
            phone: phone,
            provinceId: provinceId,
            districtId: districtId,
            wardId: wardId,
            imageId: imageId,
            imageUrl: imageUrl,
            role: "R3"
          });
          resolve({
            code: 0,
            msg: "Create a new user success !",
            body: infoUser.dataValues
            // return for controller handle token
          });
        } else {
          resolve({
            code: 2,
            msg: "Your email is already in used, Pleas try another email !"
          });
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        code: -1,
        msg: "Error from server"
      });
    }
  });
};

userService.getUser = (queryString) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { query } = new APIFeatures(queryString).pagination().sort().filter().search().where();
      query = {
        ...query,
        attributes: {
          exclude: ["password"]
        }
      };
      const users = await db.User.findAndCountAll(query);
      resolve({
        code: 0,
        msg: `Get user success !`,
        body: users
      });
    } catch (error) {
      console.log(error);
      reject({
        code: -1,
        msg: "Error from server !"
      });
    }
  });
};

userService.updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { value, error } = userSchema.updateUser.validate(data);
      if (!error) {
        const { name, gender, phone, districtId, provinceId, wardId, role } = value;
        const { imageId, imageUrl, id } = data;
        const user = await db.User.findOne({
          where: { id },
          raw: false
        });
        if (user) {
          user.name = name;
          user.gender = gender;
          user.phone = phone;
          user.districtId = districtId;
          user.provinceId = provinceId;
          user.wardId = wardId;
          user.imageId = imageId;
          user.imageUrl = imageUrl;
          user.role = role;
          await user.save();
          resolve({
            code: 0,
            msg: "Update user success !"
          });
        } else {
          resolve({
            code: 2,
            msg: "User doesn't exist !"
          });
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        code: -1,
        msg: "Error form server"
      });
    }
  });
};

userService.deleteUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = data;
      if (id) {
        const user = await db.User.findOne({ where: { id: +id } });
        if (user) {
          await db.User.destroy({ where: { id: +id } });
          resolve({
            code: 0,
            msg: "Delete user success !"
          });
        } else {
          resolve({
            code: 2,
            msg: "User doesn't exist !"
          });
        }
      } else {
        resolve({
          code: 1,
          msg: "Vui lòng gửi id người dùng muốn xóa !"
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        code: -1,
        msg: "Error form server"
      });
    }
  });
};

export default userService;
