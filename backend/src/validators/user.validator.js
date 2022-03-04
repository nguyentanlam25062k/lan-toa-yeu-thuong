import Joi from "joi";
// import Joi from "@hapi/joi";

const id = Joi
  .number()
  .messages({
    "number.base": `Kiểu dữ liệu của id phải là number`,
    "number.empty": `Vui lòng không để trống id người dùng`,
    "any.required": `Vui lòng điền id người dùng`,
  })

const email = Joi
  .string()
  .pattern(new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'))
  .required()
  .messages({
    "string.base": `Kiểu dữ liệu của email phải là string`,
    "string.pattern.base": `Email không hợp lệ`,
    "any.required": `Vui lòng điền email`,
    "string.empty": `Vui lòng không để trống email`,
  })

const passwordCurrent = Joi
  .string()
  .required()
  .min(6)
  .max(20)
  .messages({
    "string.base": `Kiểu dữ liệu của mật khẩu phải là string`,
    "any.required": `Vui lòng điền mật khẩu`,
    "string.empty": `Vui lòng không để trống mật khẩu`,
    "string.min": `Mật khẩu tối thiểu {#limit} ký tự`,
    "string.max": `Mật khẩu tối đa {#limit} ký tự`,
  })

const password = Joi
  .string()
  .required()
  .min(6)
  .max(20)
  .messages({
    "string.base": `Kiểu dữ liệu của mật khẩu phải là string`,
    "any.required": `Vui lòng điền mật khẩu`,
    "string.empty": `Vui lòng không để trống mật khẩu`,
    "string.min": `Mật khẩu tối thiểu {#limit} ký tự`,
    "string.max": `Mật khẩu tối đa {#limit} ký tự`,
  })

const passwordConfirm = Joi
  .string()
  .required()
  .min(6)
  .max(20)
  .equal(Joi.ref('password'))
  .messages({
    "string.base": `Kiểu dữ liệu xác nhận mật khẩu phải là string`,
    "any.required": `Vui lòng điền xác nhận mật khẩu`,
    "string.empty": `Vui lòng điền xác không để trống mật khẩu`,
    "string.min": `Xác nhận mật khẩu tối thiểu {#limit} ký tự`,
    "string.max": `Xác nhận mật khẩu tối đa {#limit} ký tự`,
    "any.only": `Xác nhận mật khẩu không khớp`
  })

const name = Joi
  .string()
  .required()
  .min(6)
  .max(20)
  .messages({
    "string.base": `Kiểu dữ liệu của họ và tên phải là string`,
    "any.required": `Vui lòng điền họ và tên`,
    "string.empty": `Vui lòng không để trống họ và tên`,
    "string.min": `Họ và tên tối thiểu {#limit} ký tự`,
    "string.max": `Họ và tên tối đa {#limit} ký tự`,
  })

const phone = Joi
  .string()
  .required()
  .min(8)
  .max(12)
  .messages({
    "string.base": `Kiểu dữ liệu của số điện thoại phải là string`,
    "string.empty": `Vui lòng không để trống số điện thoại`,
    "any.required": `Vui lòng điền số điện thoại`,
    "string.min": `Số điện thoại tối thiểu {#limit} ký tự`,
    "string.max": `Số điện thoại tối đa {#limit} ký tự`,
  })

const provinceId = Joi
  .number()
  .required()
  .messages({
    "number.base": `Kiểu dữ liệu của id tỉnh / thành phố phải là number`,
    "number.empty": `Vui lòng không để trống id tỉnh / thành phố`,
    "any.required": `Vui lòng điền id tỉnh / thành phố`,
  })

const districtId = Joi
  .number()
  .required()
  .messages({
    "number.base": `Kiểu dữ liệu của id quận / huyện phải là number`,
    "number.empty": `Vui lòng điền id quận / huyện`,
    "any.required": `Vui lòng điền id quận / huyện`,
  })

const wardId = Joi
  .number()
  .required()
  .messages({
    "number.base": `Kiểu dữ liệu của id phường / xã phải là number`,
    "number.empty": `Vui lòng không để trống id phường / xã`,
    "any.required": `Vui lòng điền id phường / xã`,
  })

const gender = Joi
  .string()
  .messages({
    "string.base": `Kiểu dữ liệu của giới tính phải là string`,
    "string.empty": `Vui lòng không để trống giới tính`,
  })

const role = Joi
  .string()
  .messages({
    "string.base": `Kiểu dữ liệu của vai trò phải là string`,
    "string.empty": `Vui lòng không để trống vai trò`,
  })

const imageId = Joi
  .string()
  .messages({
    "string.base": `Kiểu dữ liệu của id ảnh đại diện phải là string`,
    "string.empty": `Vui lòng điền id ảnh đại diện`,
  })

const imageUrl = Joi
  .string()
  .messages({
    "string.base": `Kiểu dữ liệu của url ảnh đại diện phải là string`,
    "string.empty": `Vui lòng không để trống url ảnh đại diện`,
  })

const initUserSchema = {
  id: id,
  email: email,
  passwordCurrent: passwordCurrent,
  password: password,
  passwordConfirm: passwordConfirm,
  name: name,
  gender: gender,
  phone: phone,
  districtId: districtId,
  provinceId: provinceId,
  wardId: wardId,
  imageId: imageId,
  imageUrl: imageUrl,
  role: role
}

const userSchema = {};

const initCreateUserSchema = {...initUserSchema};
delete initCreateUserSchema.id;
delete initCreateUserSchema.passwordCurrent;
userSchema.createUser = Joi.object().keys({...initCreateUserSchema});

const initUpdateUserSchema = {...initUserSchema};
delete initUpdateUserSchema.email;
userSchema.updateUser = Joi.object().keys({...initUpdateUserSchema});

userSchema.signIn = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  email: Joi.string()
    .pattern(new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'))
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required()
});

export default userSchema;
