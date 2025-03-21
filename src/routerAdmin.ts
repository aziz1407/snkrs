import express from "express";
import adminController  from "./controllers/admin.controller";
import makeUploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";


const routerAdmin = express.Router();

/**Admin */
routerAdmin.get("/", adminController.goHome)
.post(
  "/signup",
  makeUploader("members").single("memberImage"),
  adminController.processSignup
);

routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

  routerAdmin
  .get("/check-me", adminController.checkAuthSession)
  .get("/logout", adminController.logout);

  /**Product */
routerAdmin.get(
  "/product/all",
  adminController.verifyRestaurant, //middleware pattern
  productController.getAllProducts
);

routerAdmin.post(
  "/product/create",
  adminController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);

routerAdmin.post(
  "/product/:id",
  adminController.verifyRestaurant, //:id=param=which product is being updated
  productController.updateChosenProduct
);

//SPA
routerAdmin.get("/signup", adminController.getSign);

routerAdmin.get("/login", adminController.getLogin);

export default routerAdmin;