import * as yup from "yup";
import { mergeSchema } from "../utils";

const id = yup.object().shape({
  id: yup.number("Id phải là số").required("Vui lòng nhập id")
});

const name = yup.object().shape({
  name: yup.array().required("Vui lòng nhập tên").min(3, "Tên tối thiểu 3 ký tự").max(30, "Tên tối đa 30 ký tự")
});

const productCategorySchema = {};

productCategorySchema.createProductCategory = mergeSchema(name);

productCategorySchema.updateProductCategory = mergeSchema(name);

export { productCategorySchema };
