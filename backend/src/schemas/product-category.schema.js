import Joi from "joi";

// const slug = Joi.string().required().min(6).max(50).messages({
//   "string.base": `Kiểu dữ liệu của slug danh mục sản phẩm phải là string`,
//   "any.required": `Vui lòng điền slug danh mục sản phẩm`,
//   "string.empty": `Vui lòng không để trống slug danh mục sản phẩm`,
//   "string.min": `slug danh mục sản phẩm tối thiểu {#limit} ký tự`,
//   "string.max": `slug danh mục sản phẩm tối đa {#limit} ký tự`
// });

// const active = Joi.number().valid(0, 1).required().messages({
//   "number.base": `Kiểu dữ liệu của kích hoạt danh mục sản phẩm phải là tiny number`,
//   "number.empty": `Vui lòng không để trống kích hoạt danh mục sản phẩm`,
//   "any.only": `Trường active chỉ chấp nhập 0 hoặc 1`,
//   "any.required": `Vui lòng điền kích hoạt danh mục sản phẩm`
// });

// const imageId = Joi.string().allow(null).messages({
//   "string.base": `Kiểu dữ liệu của ảnh đại diện phải là string`,
//   "string.empty": `Vui lòng điền id ảnh đại diện`
// });

// const imageUrl = Joi.string().allow(null).messages({
//   "string.base": `Kiểu dữ liệu của url ảnh đại diện phải là string`,
//   "string.empty": `Vui lòng không để trống url ảnh đại diện`
// });

// const userId = Joi.number().messages({
//   "number.base": `Kiểu dữ liệu của id người dùng phải là number`,
//   "number.empty": `Vui lòng không để trống id người dùng`,
//   "any.required": `Vui lòng điền id người dùng`
// });

const id = Joi.number().messages({
    "number.base": `Kiểu dữ liệu của id phải là number`,
    "number.empty": `Vui lòng không để trống id danh mục sản phẩm`,
    "any.required": `Vui lòng điền id danh mục sản phẩm`
});

const name = Joi.string().required().min(2).max(50).messages({
    "string.base": `Kiểu dữ liệu của danh mục sản phẩm phải là string`,
    "any.required": `Vui lòng điền danh mục sản phẩm`,
    "string.empty": `Vui lòng không để trống danh mục sản phẩm`,
    "string.min": `danh mục sản phẩm tối thiểu {#limit} ký tự`,
    "string.max": `danh mục sản phẩm tối đa {#limit} ký tự`
});

const parentId = Joi.number().allow(null).messages({
    "number.base": `Kiểu dữ liệu của id danh mục cha phải là number`,
    "number.empty": `Vui lòng không để trống id danh mục cha`
});

const initProductCategorySchema = {
    id: id,
    name: name,
    // slug: slug,
    // active: active,
    // imageId: imageId,
    // imageUrl: imageUrl,
    // userId: userId,
    parentId: parentId
};

const productCategorySchema = {};

const initCreateProductCategorySchema = { ...initProductCategorySchema };
["id"].map((e) => delete initCreateProductCategorySchema[e]);
productCategorySchema.createProductCategory = Joi.object().keys({ ...initCreateProductCategorySchema });

const initUpdateProductCategorySchema = { ...initProductCategorySchema };

productCategorySchema.updateProductCategory = Joi.object().keys({ ...initUpdateProductCategorySchema });

export { productCategorySchema };
