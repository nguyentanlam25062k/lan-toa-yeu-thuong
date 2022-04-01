import slugify from "slugify";
import db from "../models";
import { convertToSlug, generateShortId } from "../utils/index.util";
import { productCategorySchema } from "../schemas/index.schema";

const { Op } = require("sequelize");

const productCategoryService = {};

productCategoryService.getProductCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productCategoryList = await db.Product_Category.findAll();
      resolve({
        code: 0,
        msg: "Lấy danh mục sản phẩm thành công !",
        body: productCategoryList
      });
    } catch (e) {
      console.log(e);
      reject({
        code: -1,
        msg: "Error from server"
      });
    }
  });
};

productCategoryService.createProductCategory = (infoProductCate) => {
  return new Promise(async (resolve, reject) => {
    try {
      ["active", "parentId", "userId"].forEach((e) => {
        if (e === "parentId" && !infoProductCate[e]) {
          delete infoProductCate[e];
        } else {
          infoProductCate[e] = +infoProductCate[e];
        }
      });
      const { value, error } = productCategorySchema.createProductCategory.validate(infoProductCate);
      console.log("value", value);
      if (!error) {
        const { name, active, imageId, imageUrl, userId, parentId } = value;
        let slug = convertToSlug(name);

        const isExistSlug = await db.Product_Category.findOne({
          where: { slug }
        });

        if (isExistSlug) {
          slug = `${slug}-${generateShortId()}`;
        }

        await db.Product_Category.create({
          name: name,
          slug: slug,
          active: active,
          imageId: imageId,
          imageUrl: imageUrl,
          userId: userId,
          parentId: parentId
        });

        resolve({
          code: 0,
          msg: "Tạo mới danh mục sản phẩm thành công !"
        });
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

productCategoryService.updateProductCategory = (infoProductCate) => {
  return new Promise(async (resolve, reject) => {
    try {
      ["active", "parentId", "userId"].forEach((e) => {
        if (e === "parentId" && !infoProductCate[e]) {
          delete infoProductCate[e];
        } else {
          infoProductCate[e] = +infoProductCate[e];
        }
      });
      const { value, error } = productCategorySchema.updateProductCategory.validate(infoProductCate);
      if (!error) {
        const { id, name, active, imageId, imageUrl, userId, parentId } = value;
        const updatedCategories = [];
        if (name instanceof Array) {
          for (let i = 0; i < name.length; i++) {
            let category = {};

            for (const key in value) {
              if (key === "parentId" && !parentId[i]) {
                continue;
              } else {
                category[key] = name[i];
              }
            }

            updatedCategories.push(category);

            const productCate = await db.Product_Category.findOne({
              where: { id },
              raw: false
            });

            if (productCate) {
              await db.Product_Category.save({ category });
            } else {
              console.log(`productCate doesn't exist`);
            }
          }
          resolve({
            code: 0,
            msg: "Update category list success !",
            body: updatedCategories
          });
        } else {
          const category = { name, type };
          if (parentId !== "") category.parentId = parentId;
          const updateCategory = await Category.findOneAndUpdate({ id }, category, { new: true });
          resolve({
            code: 0,
            msg: "Update category list success !",
            body: updateCategory
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

export default productCategoryService;
