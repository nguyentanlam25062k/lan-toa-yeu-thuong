import slugify from "slugify";
import db from "../models";
import { convertToSlug, generateShortId } from "../utils/index.util";
import { productCategorySchema } from "../schemas/index.schema";

const { Op } = require("sequelize");

const productCategoryService = {};

function getAllIndexes(arr, val) {
    let i,
        indexes = [];

    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
}

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
            const { value, error } = productCategorySchema.createProductCategory.validate(infoProductCate);
            if (!error) {
                const { name, userId, parentId } = value;
                const isExistName = await db.Product_Category.findOne({
                    where: { name }
                });
                if (!isExistName) {
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
                        userId: userId,
                        parentId: parentId
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

productCategoryService.updateProductCategory = (productCateList) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("productCateList", productCateList);
            let isValidValidate = true;
            let value, error;
            for (let i = 0; i < productCateList.length; i++) {
                value = productCategorySchema.updateProductCategory.validate(productCateList[i]).value;
                error = productCategorySchema.updateProductCategory.validate(productCateList[i]).error;

                if (error) {
                    isValidValidate = false;
                    break;
                }
            }
            if (isValidValidate) {
                const productCateInstantList = await Promise.all(
                    productCateList.map((item) =>
                        db.Product_Category.findOne({
                            where: { id: item.id },
                            raw: false
                        })
                    )
                );

                const posProductCateIdErrorList = getAllIndexes(productCateInstantList, null);

                if (posProductCateIdErrorList.length === 0) {
                    let updateParentIdList = [];
                    for (let i = 0; i < productCateList.length; i++) {
                        if (
                            productCateList[i].name === productCateInstantList[i].dataValues.name &&
                            productCateList[i].parentId !== productCateInstantList[i].dataValues.parentId
                        ) {
                            productCateInstantList[i].parentId = productCateList[i].parentId;
                            updateParentIdList.push(productCateInstantList[i]);
                        }
                    }

                    if (updateParentIdList.length === 0) {
                        const validProductCateNameList = await Promise.all(
                            productCateList.map((item) =>
                                db.Product_Category.findOne({
                                    where: { name: item.name }
                                })
                            )
                        );
                        const validProductCateNameErrorList = validProductCateNameList.filter((item) => item !== null);
                        if (validProductCateNameErrorList.length === 0) {
                            for (let i = 0; i < productCateList.length; i++) {
                                const { name, parentId } = productCateList[i];
                                let slug = convertToSlug(productCateList[i].name);
                                if (slug === productCateInstantList[i].slug) {
                                    slug = `${slug}-${generateShortId()}`;
                                }
                                productCateInstantList[i].name = name;
                                productCateInstantList[i].slug = slug;
                                productCateInstantList[i].parentId = parentId;
                            }
                            await Promise.all(productCateInstantList.map((item) => item.save()));
                            resolve({
                                code: 0,
                                msg: "Cập nhập danh mục sản phẩm thành công !"
                            });
                        } else {
                            const nameExist = validProductCateNameErrorList.map((item) => item.name).join(", ");
                            resolve({
                                code: 2,
                                msg: `Tên danh mục ${nameExist} đã tồn tại !`
                            });
                        }
                    } else {
                        await Promise.all(updateParentIdList.map((item) => item.save()));
                        resolve({
                            code: 0,
                            msg: "Cập nhập id danh mục cha thành công !"
                        });
                    }
                } else {
                    const idExist = posProductCateIdErrorList
                        .map((position) => productCateList[position].id)
                        .join(", ");
                    resolve({
                        code: 3,
                        msg: `Không tìm thấy id danh mục: ${idExist} !`
                    });
                }
            } else {
                resolve({
                    code: 1,
                    msg: error.details[0].message
                });
            }
        } catch (e) {
            reject({
                code: -1,
                msg: "Error from server"
            });
        }
    });
};

productCategoryService.deleteProductCategory = (productCateList) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("productCateList", productCateList);
            const productCateIdList = productCateList?.id;
            if (productCateIdList?.length > 0) {
                const productCateList = await Promise.all(
                    productCateIdList.map((id) =>
                        db.Product_Category.findOne({
                            where: { id }
                        })
                    )
                );

                const posProductCateErrorList = getAllIndexes(productCateList, null);
                console.log("posProductCateErrorList", posProductCateErrorList);
                if (posProductCateErrorList.length === 0) {
                    const data = await Promise.all(
                        productCateIdList.map((id) => db.Product_Category.destroy({ where: { id } }))
                    );
                    resolve({
                        code: 0,
                        msg: "Xóa danh mục sản phẩm thành công !"
                    });
                } else {
                    const idExist = posProductCateErrorList.map((position) => productCateIdList[position]).join(", ");
                    resolve({
                        code: 2,
                        msg: `Không tìm thấy id danh mục: ${idExist} !`
                    });
                }
            } else {
                reject({
                    code: 1,
                    msg: "Vui lòng nhập id cần xóa"
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
