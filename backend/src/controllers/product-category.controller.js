import productCategoryService from "../services/product-category.service";

const productCategoryController = {};

productCategoryController.getProductCategory = async (req, res) => {
    try {
        const data = await productCategoryService.getProductCategory();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productCategoryController.createProductCategory = async (req, res) => {
    try {
        const data = await productCategoryService.createProductCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productCategoryController.updateProductCategory = async (req, res) => {
    try {
        const data = await productCategoryService.updateProductCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productCategoryController.deleteProductCategory = async (req, res) => {
    try {
        const data = await productCategoryService.deleteProductCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default productCategoryController;
