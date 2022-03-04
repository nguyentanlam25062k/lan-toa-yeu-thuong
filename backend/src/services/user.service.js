const {Op} = require("sequelize");
import db from '../models/index';
import userSchema from "../validators/user.validator";
import {hashPassword, comparePassword, APIFeatures} from "../helpers/index.helper";
import _ from "lodash";
import config from "../config/index.config";

const userService = {};

userService.login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userSchema.signIn.validate(data);
      const {email, password} = value;
      if (!error) {
        const user = await db.User.findOne({
          where: {email},
          attributes: ['firstName', 'lastName', 'email', 'password', 'role']
        })
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
      reject({
        code: -1,
        msg: 'Error from server'
      });
    }
  })
}

userService.createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {

      const {value, error} = userSchema.createUser.validate(data);
      if (!error) {
        const {name, email, password, gender, phone, districtId, provinceId, wardId} = value;
        const {imageId, imageUrl} = data;
        const user = await db.User.findOne({
          where: {email}
        })
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
            role: 'R3'
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
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        })
      }
    } catch (e) {
      console.log(e)
      reject({
        code: -1,
        msg: 'Error from server'
      });
    }
  })
}

userService.getUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user, order;
      let {id, page, limit, offset, sort, search} = data;
      // pagination
      page = Number(data.page) || config.DEFAULT_PAGE;
      limit = Number(data.limit) || config.DEFAULT_LIMIT_PAGE;
      offset = limit * (page - 1);
      // sort
      sort = data.sort || config.DEFAULT_SORT_FIELD;
      order = sort.includes('-') ? [[sort.replace('-', ''), 'DESC']] : [[sort, 'ASC']];
      // search
      search = data.search;
      // filter
      const queryObj = {...data};
      const excludeField = ['page', 'limit', 'sort', 'search'];
      excludeField.forEach(el => delete queryObj[el]);
      const firstKeyQuery = Object.keys(queryObj)[0];

      const options = {where: {}, limit, offset, order};

      if (typeof queryObj[firstKeyQuery] === 'object') {
        console.log('filter ===============')
        for (const key in queryObj[firstKeyQuery]) {
          queryObj[firstKeyQuery] = {[Op[key]]: Number(queryObj[firstKeyQuery][key])}
          options.where = queryObj;
          user = await db.User.findAndCountAll(options);

        }
      }

      if (id === undefined) {
        console.log('all ===============')
        user = await db.User.findAndCountAll(options);
      }
      if (id && (typeof queryObj[firstKeyQuery] !== 'object')) {
        console.log('id ===============')
        user = await db.User.findOne({where: {id}});
      }

      if (search) {
        console.log('search ===============')
        options.where.email = {[Op.like]: `%${search}%`};
        user = await db.User.findAndCountAll(options);
      }

      if (user) {

        const resultUser = {...user};
        if(user.rows) {
          // delete Object.assign(resultUser, user, {['totalRows']: user['count'] })['count'];
          resultUser.pagination = {page, limit, totalRows: user.count};
          delete resultUser.count;
        }
        resolve({
          code: 0,
          msg: `Get user success !`,
          body: user.rows ? resultUser : user
        })
      } else {
        resolve({
          code: 1,
          msg: `Can't not found user !`
        })
      }
    } catch (error) {
      console.log(error)
      reject({
        code: -1,
        msg: 'Error from server !'
      });
    }
  })
}

userService.updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = userSchema.createUser.validate(data);
      if (!error) {
        const {firstName, lastName, gender, phone, districtId, provinceId, wardId, role} = value;
        const {imageId, imageUrl, id} = data;
        const user = await db.User.findOne({
          where: {id},
          raw: false
        });
        if (user) {
          user.firstName = firstName;
          user.lastName = lastName;
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
            msg: "Update user success !",
          });
        } else {
          resolve({
            code: 2,
            msg: "User doesn't exist !"
          })
        }
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
        })
      }
    } catch (error) {
      console.log(error)
      reject({
        code: -1,
        msg: 'Error form server'
      });
    }
  })
}

userService.deleteUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {id} = data;
      const user = await db.User.findOne({where: {id}})
      if (user) {
        await db.User.destroy({where: {id}})
        resolve({
          code: 0,
          msg: "Delete user success !"
        })
      } else {
        resolve({
          code: 1,
          msg: "User doesn't exist !"
        })
      }
    } catch (error) {
      reject({
        code: -1,
        msg: 'Error form server'
      });
    }
  })
}


export default userService;