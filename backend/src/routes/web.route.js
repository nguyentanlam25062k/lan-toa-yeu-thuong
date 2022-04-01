import express from "express";
import homeController from "../controllers/home.controller.js";
import userController from "../controllers/user.controller.js";
import validateImage from "../middlewares/validateImage.middleware";
import uploadMulter from "../utils/multer.util";
import uploadController from "../controllers/upload.controller";
import userExtraInfoController from "../controllers/user-extra-info.controller";
import allCodeController from "../controllers/all-code.controller";
import productCategoryController from "../controllers/product-category.controller.js";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/get-all-code", allCodeController.getAllCode);

  router.get("/get-user", userController.getUser);
  router.post("/create-user", userController.createNewUser);
  router.patch("/update-user", userController.updateUser);
  router.delete("/delete-user", userController.deleteUser);

  router.post("/login", userController.login);
  router.post("/logout", userController.logout);

  router.get("/refresh-token", userController.refreshToken);

  router.post("/upload-image", uploadMulter.array("image", 4), uploadController.uploadImage);
  router.delete("/delete-image", uploadController.deleteImage);

  router.get("/get-product-category", productCategoryController.getProductCategory);
  router.post("/create-product-category", productCategoryController.createProductCategory);
  router.patch("/update-product-category", productCategoryController.updateProductCategory);
  // router.delete("/delete-product-category", productCategoryController.deleteProductCategory);

  // router.post('/create-category', uploadMulter.array('image'), validateImage );

  router.get("*", (req, res) => {
    res.status(200).json({
      message: "hello Lan Toa Yeu Thuong"
    });
  });

  return app.use("/", router);
};

export default initWebRoutes;
