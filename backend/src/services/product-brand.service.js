import slugify from "slugify";
import db from "../models";
import { convertToSlug, generateShortId } from "../utils/index.util";
import { productBrandSchema } from "../schemas/index.schema";
import { APIFeatures } from "../utils/index.util";
const { Op } = require("sequelize");

const productBrandService = {};

function getAllIndexes(arr, val) {
    let i,
        indexes = [];

    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
}

productBrandService.getProductBrand = (queryString) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("queryString", queryString);
            let { query } = new APIFeatures(queryString).pagination().sort().filter().search().where();
            query = {
                ...query,
                include: [{ model: db.User, as: "userData", attributes: ["name"] }],
                raw: true,
                nest: true
            };
            console.log("query", query);
            const productBrandList = await db.Product_Brand.findAndCountAll(query);
            resolve({
                code: 0,
                msg: "Lấy danh mục sản phẩm thành công !",
                body: productBrandList
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

productBrandService.createProductBrand = (infoProductCate) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("infoProductCate", infoProductCate);
            const { value, error } = productBrandSchema.createProductBrand.validate(infoProductCate);
            if (!error) {
                const { name, userId, parentId, imageId, imageUrl } = value;
                const isExistName = await db.Product_Brand.findOne({
                    where: { name }
                });
                if (!isExistName) {
                    let slug = convertToSlug(name);

                    const isExistSlug = await db.Product_Brand.findOne({
                        where: { slug }
                    });

                    if (isExistSlug) {
                        slug = `${slug}-${generateShortId()}`;
                    }

                    await db.Product_Brand.create({
                        name: name,
                        slug: slug,
                        userId: userId,
                        parentId: parentId,
                        imageId: imageId,
                        imageUrl: imageUrl
                    });

                    resolve({
                        code: 0,
                        msg: "Tạo mới danh mục sản phẩm thành công !"
                    });
                } else {
                    resolve({
                        code: 2,
                        msg: "Tên danh mục đã tồn tại !"
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

productBrandService.updateProductBrand = (infoProductCate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { value, error } = productBrandSchema.updateProductBrand.validate(infoProductCate);
            if (!error) {
                const brand = await db.Product_Brand.findOne({
                    where: { id: value.id },
                    raw: false
                });
                if (brand) {
                    ["name", "active", "imageId", "imageUrl", "userId"].forEach((item) => {
                        brand[item] = value[item];
                    });
                    await brand.save();
                    resolve({
                        code: 0,
                        msg: "Cập nhập thương hiệu sản phẩm thành công !"
                    });
                } else {
                    resolve({
                        code: 2,
                        msg: "Không tìm thấy id thương hiệu sản phẩm !"
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
                msg: "Error form server"
            });
        }
    });
};

productBrandService.deleteProductBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = data;
            if (id) {
                const brand = await db.Product_Brand.findOne({ where: { id: +id } });
                if (brand) {
                    await db.Product_Brand.destroy({ where: { id: +id } });
                    resolve({
                        code: 0,
                        msg: "Xóa thương hiệu sản phẩm thành công !"
                    });
                } else {
                    resolve({
                        code: 2,
                        msg: "Không tìm thấy id thương hiệu sản phẩm !"
                    });
                }
            } else {
                resolve({
                    code: 1,
                    msg: "Vui lòng gửi id thương hiệu sản phẩm muốn xóa !"
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

productBrandService.updateActiveProductBrand = (infoProductCate) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("infoProductCate", infoProductCate);
            const { value, error } = productBrandSchema.updateActiveProductBrand.validate(infoProductCate);
            if (!error) {
                const brand = await db.Product_Brand.findOne({
                    where: { id: value.id },
                    raw: false
                });
                if (brand) {
                    ["active"].forEach((item) => {
                        brand[item] = value[item];
                    });
                    await brand.save();
                    resolve({
                        code: 0,
                        msg: "Cập nhập trạng thái thương hiệu sản phẩm thành công !"
                    });
                } else {
                    resolve({
                        code: 2,
                        msg: "Không tìm thấy id thương hiệu sản phẩm !"
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
                msg: "Error form server"
            });
        }
    });
};

export default productBrandService;
