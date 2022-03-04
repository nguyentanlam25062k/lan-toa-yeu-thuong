import productCategoryService from '../services/product-category.service';
import config from "../config/index.config";

const productCategoryController = {};

productCategoryController.productCategory = async (req, res) => {
  try {
    const data = await productCategoryService.productCategory(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

productCategoryController.createCategory = async (req, res) => {
  try {
    const data = await productCategoryService.createCategory(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default productCategoryController