import Joi from "joi";

// const userId = Joi.number().messages({
//   "number.base": `Kiểu dữ liệu của id người dùng phải là number`,
//   "number.empty": `Vui lòng không để trống id người dùng`,
//   "any.required": `Vui lòng điền id người dùng`
// });

const active = Joi.number().valid(0, 1).required().messages({
    "number.base": `Kiểu dữ liệu của kích hoạt thương hiệu sản phẩm phải là tiny number`,
    "number.empty": `Vui lòng không để trống kích hoạt thương hiệu sản phẩm`,
    "any.only": `Trường active chỉ chấp nhập 0 hoặc 1`,
    "any.required": `Vui lòng điền kích hoạt thương hiệu sản phẩm`
});

// const active = Joi.boolean().required().messages({
//     "boolean.base": `Kiểu dữ liệu của kích hoạt thương hiệu sản phẩm phải là boolean`,
//     "boolean.empty": `Vui lòng không để trống kích hoạt thương hiệu sản phẩm`,
//     "any.required": `Vui lòng điền kích hoạt thương hiệu sản phẩm`
// });

const imageId = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của ảnh đại diện phải là string`,
    "string.empty": `Vui lòng điền id ảnh đại diện`
});

const imageUrl = Joi.string().allow(null).messages({
    "string.base": `Kiểu dữ liệu của url ảnh đại diện phải là string`,
    "string.empty": `Vui lòng không để trống url ảnh đại diện`
});

const id = Joi.number().messages({
    "number.base": `Kiểu dữ liệu của id phải là number`,
    "number.empty": `Vui lòng không để trống id thương hiệu sản phẩm`,
    "any.required": `Vui lòng điền id thương hiệu sản phẩm`
});

const name = Joi.string().required().min(2).max(50).messages({
    "string.base": `Kiểu dữ liệu của thương hiệu sản phẩm phải là string`,
    "any.required": `Vui lòng điền thương hiệu sản phẩm`,
    "string.empty": `Vui lòng không để trống thương hiệu sản phẩm`,
    "string.min": `thương hiệu sản phẩm tối thiểu {#limit} ký tự`,
    "string.max": `thương hiệu sản phẩm tối đa {#limit} ký tự`
});

const userId = Joi.number().allow(null).messages({
    "number.base": `Kiểu dữ liệu của id thương hiệu cha phải là number`,
    "number.empty": `Vui lòng không để trống id thương hiệu cha`
});

const initProductBrandSchema = {
    id: id,
    name: name,
    active: active,
    imageId: imageId,
    imageUrl: imageUrl,
    userId: userId
};

const productBrandSchema = {};

const initCreateProductBrandSchema = { ...initProductBrandSchema };
["id"].forEach((e) => delete initCreateProductBrandSchema[e]);
productBrandSchema.createProductBrand = Joi.object().keys({ ...initCreateProductBrandSchema });

const initUpdateProductBrandSchema = { ...initProductBrandSchema };
productBrandSchema.updateProductBrand = Joi.object().keys({ ...initUpdateProductBrandSchema });

const initUpdateActiveProductBrandSchema = { ...initProductBrandSchema };
["name", "imageId", "imageUrl", "userId"].forEach((e) => delete initUpdateActiveProductBrandSchema[e]);
productBrandSchema.updateActiveProductBrand = Joi.object().keys({ ...initUpdateActiveProductBrandSchema });

export { productBrandSchema };
