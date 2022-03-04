import userSchema from "../validators/user.validator";

const {Op} = require("sequelize");
import db from '../models/index';
import productCategorySchema from "../validators/product-category.validator";
import {hashPassword, comparePassword, APIFeatures} from "../helpers/index.helper";
import _ from "lodash";
import config from "../config/index.config";

const productCategoryService = {};

productCategoryService.productCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {value, error} = productCategorySchema.createCategory.validate(data);
      if(!error) {
        const {name, slug, active, productCategoryParent, userId, image} = data;
        console.log(data)
        resolve({
          code: 0,
          msg: "Create category success !"
        })
      } else {
        resolve({
          code: 1,
          msg: error.details[0].message
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

export default productCategoryService;