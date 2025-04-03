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
  .get("/signup", adminController.getSign)
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

  routerAdmin
  .get("/check-me", adminController.checkAuthSession)
  .get("/logout", adminController.logout);

  /**Product */
routerAdmin.get(
  "/product/all",
  adminController.verifyAdmin, //middleware pattern
  productController.getAllProducts
);

routerAdmin.post(
  "/product/create",
  adminController.verifyAdmin,
  makeUploader("products").any(),
  productController.createNewProduct
);

routerAdmin.post(
  "/product/:id",
  adminController.verifyAdmin, //:id=param=which product is being updated
  productController.updateChosenProduct
);

//**User**/

routerAdmin.get(
  "/user/all",
  adminController.verifyAdmin,
  adminController.getUsers
);

routerAdmin.post(
  "/user/edit",
  adminController.verifyAdmin,
  adminController.updateChosenUser
);


export default routerAdmin;