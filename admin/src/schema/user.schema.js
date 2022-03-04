import * as yup from "yup";
import {mergeSchema} from "./index.schema";

const email = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email không hợp lệ"
    )
})

const password = yup.object().shape({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(30, "Mật khẩu tối đa 30 ký tự")
})

const confirmPassword = yup.object().shape({
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận lại mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(30, "Mật khẩu tối đa 30 ký tự")
    .oneOf([yup.ref('password'), null], 'Passwords must match')

})

const name = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập tên")
    .min(3, "Tên tối thiểu 3 ký tự")
    .max(30, "Tên tối đa 30 ký tự")
})


const gender = yup.object().shape({
  gender: yup
    .string()
    .required("Vui lòng chọn giới tính required")
})

const phone = yup.object().shape({
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(8, "Số điện thoại tối thiểu 8 ký tự")
    .max(20, "Số điện thoại tối đa 20 ký tự")
})

const role = yup.object().shape({
  role: yup
    .string()
    .required("Vui lòng chọn vai trò")
})

const provinceId = yup.object().shape({
  provinceId: yup
    .number()
    .typeError("Kiểu dữ liệu Id tỉnh / thành phố phải là số")
    .required("Vui lòng chọn tỉnh / thành phố")
})

const districtId = yup.object().shape({
  districtId: yup
    .number()
    .typeError("Kiểu dữ liệu Id quận / huyện phải là số")
    .required("Vui lòng chọn quận / huyện")
})

const wardId = yup.object().shape({
  wardId: yup
    .number()
    .typeError("Kiểu dữ liệu Id xã / phường phải là số")
    .required("Vui lòng chọn xã / phường")
    .nullable()
})

const userSchema = {};

userSchema.createUser = mergeSchema(email, password, confirmPassword, name, gender, phone, role, provinceId, districtId, wardId);



export default userSchema;