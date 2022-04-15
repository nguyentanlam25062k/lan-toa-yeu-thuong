import { axios } from "../utils";

const productBrandApi = {};

productBrandApi.getProductBrand = (query) => {
    return axios.get(`/get-product-brand?${query}`);
};

productBrandApi.createProductBrand = (infoBrand) => {
    return axios.post(`/create-product-brand`, infoBrand);
};

productBrandApi.updateProductBrand = (infoBrand) => {
    return axios.patch(`/update-product-brand`, infoBrand);
};

productBrandApi.deleteProductBrand = (id) => {
    console.log("id", id);
    return axios.delete(`/delete-product-brand`, { data: { id: id } });
};

productBrandApi.updateActiveProductBrand = (infoBrand) => {
    return axios.patch(`/update-active-product-brand`, infoBrand);
};

export { productBrandApi };
