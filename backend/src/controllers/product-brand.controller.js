import productBrandService from "../services/product-brand.service";

const productBrandController = {};

productBrandController.getProductBrand = async (req, res) => {
    try {
        const data = await productBrandService.getProductBrand(req.query);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productBrandController.createProductBrand = async (req, res) => {
    try {
        const data = await productBrandService.createProductBrand(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productBrandController.updateProductBrand = async (req, res) => {
    try {
        const data = await productBrandService.updateProductBrand(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productBrandController.deleteProductBrand = async (req, res) => {
    try {
        const data = await productBrandService.deleteProductBrand(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

productBrandController.updateActiveProductBrand = async (req, res) => {
    try {
        const data = await productBrandService.updateActiveProductBrand(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default productBrandController;
