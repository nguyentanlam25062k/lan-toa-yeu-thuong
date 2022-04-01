import { axios } from "../utils";

const productCategoryApi = {};

productCategoryApi.getProductCategory = () => {
  return axios.get(`/get-product-category`);
};

productCategoryApi.createProductCategory = (infoCategory) => {
  return axios.post(`/create-product-category`, infoCategory);
};

productCategoryApi.updateProductCategory = (infoCategory) => {
  return axios.patch(`/update-product-category`, infoCategory);
};

productCategoryApi.deleteProductCategory = (id) => {
  return axios.delete(`/delete-product-category`, { data: { id: id } });
};

export { productCategoryApi };
